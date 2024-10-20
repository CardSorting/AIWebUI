// src/pages/api/generate-image.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { fal } from "@fal-ai/client";
import B2 from 'backblaze-b2';
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interfaces
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
    // Include other fields as needed
  };
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.warn(`Method ${req.method} not allowed`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    console.warn('Missing or invalid prompt in request body');
    return res.status(400).json({ error: 'Prompt is required and must be a string.' });
  }

  console.log("Received prompt:", prompt);

  try {
    const apiKey = process.env.NEXT_PUBLIC_FAL_KEY;

    if (!apiKey) {
      console.error("NEXT_PUBLIC_FAL_KEY environment variable is not set");
      return res.status(500).json({ error: 'Server configuration error: API key is missing.' });
    }

    fal.config({ credentials: apiKey });
    console.log("Configured FAL with API Key.");

    const input = {
      prompt,
      image_size: "landscape_4_3",
      num_images: 1,
      enable_safety_checker: true,
      safety_tolerance: "2"
    };

    console.log("Calling fal.subscribe with input:", input);

    let queueUpdates: any[] = [];

    const result: GenerateImageResponse = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input,
      logs: true,
      onQueueUpdate: (update) => {
        queueUpdates.push(update);
        console.log(`Queue Update - Status: ${update.status}`);
        if (update.status === "IN_PROGRESS") {
          update.logs?.forEach(log => console.log("Progress log:", log.message));
        } else if (update.status === "FAILED") {
          console.error("Image generation failed:", update);
        }
      },
    });

    console.log("Received result from fal.subscribe:", JSON.stringify(result, null, 2));

    const imageUrl = result?.data?.images?.[0]?.url ?? null;

    if (!imageUrl) {
      console.warn("No images returned in the API response.");
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    console.log("Image generated successfully:", imageUrl);

    // Upload to Backblaze
    const backblazeUrl = await uploadToBackblaze(imageUrl, prompt);

    // Save metadata to database
    const imageMetadata = await saveImageMetadata(prompt, imageUrl, backblazeUrl, result);

    // Prepare the response payload
    const responsePayload: ApiResponse = {
      imageUrl,
      backblazeUrl,
      fullResult: result,
      queueUpdates: queueUpdates,
      imageMetadata: {
        id: imageMetadata.id,
        backblazeUrl: imageMetadata.backblazeUrl,
        // Include other fields as needed
      }
    };

    console.log("Full API response:", JSON.stringify(responsePayload, null, 2));

    // Respond with the payload
    return res.status(200).json(responsePayload);

  } catch (error) {
    console.error('Error generating AI image:', error);
    return handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
}

async function uploadToBackblaze(imageUrl: string, prompt: string): Promise<string> {
  const b2 = new B2({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID as string,
    applicationKey: process.env.B2_APPLICATION_KEY as string,
  });

  await b2.authorize();

  const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID as string,
  });

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

async function saveImageMetadata(prompt: string, imageUrl: string, backblazeUrl: string, fullResult: GenerateImageResponse) {
  return await prisma.imageMetadata.create({
    data: {
      prompt,
      imageUrl,
      backblazeUrl,
      seed: fullResult.data.seed,
      width: fullResult.data.images[0].width,
      height: fullResult.data.images[0].height,
      contentType: fullResult.data.images[0].content_type,
      hasNsfwConcepts: JSON.stringify(fullResult.data.has_nsfw_concepts),
      fullResult: JSON.stringify(fullResult),
    },
  });
}

function handleError(error: unknown, res: NextApiResponse) {
  if (error instanceof Error) {
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    let errorMessage = error.message;
    let statusCode = 500;

    const lowerCaseMessage = error.message.toLowerCase();
    if (lowerCaseMessage.includes('network')) {
      errorMessage = 'A network error occurred. Please check your connection and try again.';
      statusCode = 503;
    } else if (lowerCaseMessage.includes('timeout')) {
      errorMessage = 'The request timed out. Please try again later.';
      statusCode = 504;
    } else if (lowerCaseMessage.includes('rate limit')) {
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
    console.error('Unknown error structure:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred',
      message: 'An unknown error occurred while processing your request.',
      timestamp: new Date().toISOString(),
      requestId: res.req.headers['x-request-id'] || 'unknown'
    });
  }
}