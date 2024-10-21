import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0'; // Using Auth0's session management
import { fal } from "@fal-ai/client";
import B2 from 'backblaze-b2';
import fetch from 'node-fetch';
import { databaseAPI } from '@lib/DatabaseAPI';

interface Image {
  url: string;
  width: number;
  height: number;
  content_type: string;
}

interface Data {
  images: Image[];
  timings: Record<string, any>;
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
}

interface GenerateImageResponse {
  data: Data;
  requestId: string;
}

interface ApiResponse {
  imageUrl: string | null;
  backblazeUrl: string | null;
  fullResult: GenerateImageResponse | null;
  queueUpdates: any[];
  imageMetadata?: {
    id: string;
    backblazeUrl: string;
  };
  creditsUsed: number;
  remainingCredits: number;
}

const CREDIT_COST_PER_MEGAPIXEL = 5; // Adjust this value based on your pricing strategy
const MEMBERSHIP_CACHE_DURATION = 24 * 60 * 60 * 1000; // Cache duration: 24 hours

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// Function to fetch Patreon membership status
async function fetchPatreonMemberStatus(accessToken: string) {
  const response = await fetch('https://www.patreon.com/api/oauth2/v2/identity?include=memberships', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Patreon data');
  }

  const data = await response.json();
  const membership = data.included?.find((inc: any) => inc.type === 'member');
  return membership?.attributes?.patron_status || null;
}

// Function to check cache and fetch if expired or missing
async function getCachedMembershipStatus(userId: string, accessToken: string) {
  const cachedData = await databaseAPI.getCachedMembershipStatus(userId);
  const currentTime = new Date().getTime();

  if (cachedData && cachedData.membershipExpiry && cachedData.membershipExpiry > currentTime) {
    return cachedData.membershipTier;
  }

  const membershipTier = await fetchPatreonMemberStatus(accessToken);
  const expiry = currentTime + MEMBERSHIP_CACHE_DURATION;
  await databaseAPI.cacheMembershipStatus(userId, membershipTier, expiry);

  return membershipTier;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { prompt, imageSize = "1024x576" } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string.' });
  }

  try {
    await databaseAPI.initialize();

    const patreonAccessToken = session.user.patreonAccessToken;
    const membershipTier = await getCachedMembershipStatus(session.user.id, patreonAccessToken);

    let userCredits = 0;
    if (membershipTier === 'active_patron') {
      userCredits = 1000;
    } else if (membershipTier === 'former_patron') {
      userCredits = 50;
    } else {
      userCredits = 0;
    }

    await databaseAPI.updateUserCredits(session.user.id, userCredits);

    const [width, height] = imageSize.split('x').map(Number);
    const megapixels = (width * height) / 1000000;
    const creditCost = Math.ceil(megapixels * CREDIT_COST_PER_MEGAPIXEL);

    const user = await databaseAPI.getUserById(session.user.id);
    if (!user || user.credits < creditCost) {
      return res.status(403).json({ 
        error: 'Insufficient credits',
        required: creditCost,
        available: user ? user.credits : 0
      });
    }

    const apiKey = process.env.NEXT_PUBLIC_FAL_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server configuration error: API key is missing.' });
    }

    fal.config({ credentials: apiKey });

    const input = {
      prompt,
      image_size: imageSize,
      num_images: 1,
      enable_safety_checker: true,
      safety_tolerance: "2"
    };

    let queueUpdates: any[] = [];
    const result: GenerateImageResponse = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input,
      logs: true,
      onQueueUpdate: (update) => queueUpdates.push(update),
    });

    const imageUrl = result?.data?.images?.[0]?.url || null;
    if (!imageUrl) {
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    const backblazeUrl = await uploadToBackblaze(imageUrl, prompt);

    const imageMetadata = await databaseAPI.saveImageMetadata({
      prompt,
      imageUrl,
      backblazeUrl,
      seed: result.data.seed,
      width: result.data.images[0].width,
      height: result.data.images[0].height,
      contentType: result.data.images[0].content_type,
      hasNsfwConcepts: JSON.stringify(result.data.has_nsfw_concepts),
      fullResult: JSON.stringify(result),
      userId: session.user.id,
    });

    await databaseAPI.updateUserCredits(session.user.id, -creditCost);

    const responsePayload: ApiResponse = {
      imageUrl,
      backblazeUrl,
      fullResult: result,
      queueUpdates,
      imageMetadata: {
        id: imageMetadata.id.toString(),
        backblazeUrl: imageMetadata.backblazeUrl,
      },
      creditsUsed: creditCost,
      remainingCredits: user.credits - creditCost
    };

    return res.status(200).json(responsePayload);

  } catch (error) {
    return handleError(error, res);
  } finally {
    await databaseAPI.close();
  }
}

async function uploadToBackblaze(imageUrl: string, prompt: string): Promise<string> {
  const b2 = new B2({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID as string,
    applicationKey: process.env.B2_APPLICATION_KEY as string,
  });

  await b2.authorize();
  const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({ bucketId: process.env.B2_BUCKET_ID as string });

  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${Date.now()}-${prompt.slice(0, 20).replace(/[^a-z0-9]/gi, '_')}.jpg`;

  const { data } = await b2.uploadFile({
    uploadUrl,
    uploadAuthToken: authorizationToken,
    fileName,
    data: buffer,
    contentType: 'image/jpeg',
  });

  return `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${data.fileName}`;
}

function handleError(error: unknown, res: NextApiResponse) {
  if (error instanceof Error) {
    let errorMessage = error.message;
    let statusCode = 500;

    if (error.message.toLowerCase().includes('network')) {
      errorMessage = 'A network error occurred. Please check your connection and try again.';
      statusCode = 503;
    } else if (error.message.toLowerCase().includes('timeout')) {
      errorMessage = 'The request timed out. Please try again later.';
      statusCode = 504;
    } else if (error.message.toLowerCase().includes('rate limit')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
      statusCode = 429;
    }

    return res.status(statusCode).json({
      error: 'Failed to generate image',
      message: errorMessage,
      timestamp: new Date().toISOString(),
      requestId: res.req.headers['x-request-id'] || 'unknown'
    });
  } else {
    return res.status(500).json({
      error: 'An unexpected error occurred',
      message: 'An unknown error occurred while processing your request.',
      timestamp: new Date().toISOString(),
      requestId: res.req.headers['x-request-id'] || 'unknown'
    });
  }
}