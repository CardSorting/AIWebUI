import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { fal } from '@fal-ai/client';
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

const CREDIT_COST_PER_MEGAPIXEL = 10;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

async function getUserCredits(
  userId: string,
  userEmail: string,
): Promise<number> {
  const user = await databaseAPI.getUserById(userId);

  if (!user) {
    const initialCredits = 0;
    await databaseAPI.createUser(userId, userEmail, initialCredits);
    return initialCredits;
  }

  return user.credits;
}

async function generateImage(
  prompt: string,
  imageSize: string,
): Promise<GenerateImageResponse> {
  const apiKey = process.env.NEXT_PUBLIC_FAL_KEY;
  if (!apiKey) {
    throw new Error('Server configuration error: API key is missing.');
  }

  fal.config({ credentials: apiKey });

  const input = {
    prompt,
    image_size: imageSize,
    num_images: 1,
    enable_safety_checker: true,
    safety_tolerance: '2',
  };

  return await fal.subscribe('fal-ai/flux-pro/v1.1', {
    input,
    logs: true,
    onQueueUpdate: () => {}, // We'll handle queue updates differently
  });
}

async function uploadToBackblaze(
  imageUrl: string,
  prompt: string,
): Promise<string> {
  const b2 = new B2({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID as string,
    applicationKey: process.env.B2_APPLICATION_KEY as string,
  });

  await b2.authorize();
  const {
    data: { uploadUrl, authorizationToken },
  } = await b2.getUploadUrl({ bucketId: process.env.B2_BUCKET_ID as string });

  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${Date.now()}-${prompt
    .slice(0, 20)
    .replace(/[^a-z0-9]/gi, '_')}.jpg`;

  const { data } = await b2.uploadFile({
    uploadUrl,
    uploadAuthToken: authorizationToken,
    fileName,
    data: buffer,
    contentType: 'image/jpeg',
  });

  return `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${data.fileName}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { prompt, imageSize = '1024x576' } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res
      .status(400)
      .json({ error: 'Prompt is required and must be a string.' });
  }

  try {
    await databaseAPI.initialize();

    const userId = session.user.sub;
    const userEmail = session.user.email || 'unknown@example.com';
    const [width, height] = imageSize.split('x').map(Number);
    const megapixels = (width * height) / 1000000;
    const creditCost = Math.ceil(megapixels * CREDIT_COST_PER_MEGAPIXEL);

    let userCredits = await getUserCredits(userId, userEmail);

    if (userCredits < creditCost) {
      return res.status(403).json({
        error: 'Insufficient credits',
        required: creditCost,
        available: userCredits,
      });
    }

    const result = await generateImage(prompt, imageSize);

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
      userId,
    });

    await databaseAPI.updateUserCredits(userId, -creditCost);
    userCredits -= creditCost;

    const responsePayload: ApiResponse = {
      imageUrl,
      backblazeUrl,
      fullResult: result,
      queueUpdates: [], // We're not collecting queue updates anymore
      imageMetadata: {
        id: imageMetadata.id.toString(),
        backblazeUrl: imageMetadata.backblazeUrl,
      },
      creditsUsed: creditCost,
      remainingCredits: userCredits,
    };

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error('Error in image generation:', error);
    return res.status(500).json({
      error: 'Failed to generate image',
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'unknown',
    });
  } finally {
    await databaseAPI.close();
  }
}
