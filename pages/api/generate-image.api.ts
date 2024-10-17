// src/pages/api/generate-image.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { fal } from "@fal-ai/client";

// Define TypeScript interfaces for the expected response structure
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.warn(`Method ${req.method} not allowed`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  // Validate the presence of the prompt
  if (!prompt || typeof prompt !== 'string') {
    console.warn('Missing or invalid prompt in request body');
    return res.status(400).json({ error: 'Prompt is required and must be a string.' });
  }

  console.log("Received prompt:", prompt);

  try {
    const apiKey = process.env.FAL_KEY;

    // Ensure the API key is set
    if (!apiKey) {
      console.error("FAL_KEY environment variable is not set");
      return res.status(500).json({ error: 'Server configuration error: API key is missing.' });
    }

    // Configure the FAL client with the API key
    fal.config({ credentials: apiKey });
    console.log("Configured FAL with API Key.");

    const input = {
      prompt,
      image_size: "landscape_4_3", // Ensure this matches API specifications
      num_images: 1,
      enable_safety_checker: true, // Consider setting to false for testing
      safety_tolerance: "2"
    };

    console.log("Calling fal.subscribe with input:", input);

    let queueUpdates: any[] = [];

    // Subscribe to the image generation process
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

    // Inspect the 'result' structure
    console.log("Received result from fal.subscribe:", JSON.stringify(result, null, 2));

    // Correctly extract imageUrl from data.images[0].url
    const imageUrl = result?.data?.images?.[0]?.url ?? null;

    if (imageUrl) {
      console.log("Image generated successfully:", imageUrl);
    } else {
      console.warn("No images returned in the API response.");
      // Optionally, inspect other parts of 'result' for error messages
      console.log("Full Result:", JSON.stringify(result, null, 2));
    }

    // Prepare the response payload
    const responsePayload = {
      imageUrl, // Correctly extracted image URL
      fullResult: result, // If you need to return the entire result
      queueUpdates: queueUpdates
    };

    console.log("Full API response:", JSON.stringify(responsePayload, null, 2));

    // Respond with the payload
    return res.status(200).json(responsePayload);

  } catch (error) {
    console.error('Error generating AI image:', error);

    // Detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error('Unknown error structure:', error);
    }

    // Determine appropriate error message and status code
    let errorMessage = 'An unexpected error occurred while generating the image.';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
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
    }

    // Respond with the error
    return res.status(statusCode).json({ 
      error: 'Failed to generate image', 
      message: errorMessage,
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'unknown'
    });
  }
}