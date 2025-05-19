// src/components/AIImageGenerator/useAIImageGeneration.ts

import { useState, useCallback, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
}

interface GenerateImageResponse {
  imageUrl: string | null;
  backblazeUrl: string | null;
  fullResult: any;
  queueUpdates: any[];
}

interface ImageMetadata {
  id: string;
  prompt: string;
  imageUrl: string;
  backblazeUrl: string;
  fullResult: any;
  createdAt: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const useAIImageGeneration = () => {
  const [generatedImages, setGeneratedImages] = useState<ImageMetadata[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const resetError = useCallback(() => {
    console.log('[useAIImageGeneration] Resetting error state to null.');
    setError(null);
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = useCallback(
    async (
      url: string,
      options: RequestInit,
      retries = MAX_RETRIES,
    ): Promise<Response> => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      } catch (err) {
        if (retries > 0 && !abortControllerRef.current?.signal.aborted) {
          console.log(
            `[useAIImageGeneration] Retrying fetch... (${
              MAX_RETRIES - retries + 1
            }/${MAX_RETRIES})`,
          );
          await delay(RETRY_DELAY);
          return fetchWithRetry(url, options, retries - 1);
        }
        throw err;
      }
    },
    [],
  );

  const generateImage = useCallback(
    async (
      prompt: string,
      options?: any,
    ): Promise<GenerateImageResponse | null> => {
      console.log(
        '[useAIImageGeneration] Starting image generation with prompt:',
        prompt,
      );
      setIsGenerating(true);
      setError(null);

      abortControllerRef.current = new AbortController();

      try {
        console.log(
          '[useAIImageGeneration] Sending POST request to /api/generate-image with payload:',
          { prompt, options },
        );

        const response = await fetchWithRetry('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, ...options }),
          signal: abortControllerRef.current.signal,
        });

        console.log(
          '[useAIImageGeneration] Received response from /api/generate-image',
        );
        const data: GenerateImageResponse = await response.json();
        console.log('[useAIImageGeneration] Parsed JSON response:', data);

        const { imageUrl, backblazeUrl, fullResult, queueUpdates } = data;
        console.log('[useAIImageGeneration] Generated image URL:', imageUrl);
        console.log('[useAIImageGeneration] Backblaze URL:', backblazeUrl);

        if (backblazeUrl) {
          const newImage: ImageMetadata = {
            id: uuidv4(),
            prompt,
            imageUrl: imageUrl || '',
            backblazeUrl,
            fullResult,
            createdAt: new Date().toISOString(),
          };
          setGeneratedImages(prevImages => {
            const updatedImages = [newImage, ...prevImages];
            console.log(
              '[useAIImageGeneration] Updated generatedImages state:',
              updatedImages,
            );
            return updatedImages;
          });
        } else {
          console.warn(
            '[useAIImageGeneration] No backblazeUrl found in the API response.',
          );
          setError('Image generation failed. No Backblaze URL was returned.');
        }

        return { imageUrl, backblazeUrl, fullResult, queueUpdates };
      } catch (err) {
        console.error(
          '[useAIImageGeneration] Exception caught in generateImage:',
          err,
        );

        let errorMessage = 'An unknown error occurred during image generation.';
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'object' && err !== null) {
          const errorResponse = err as ErrorResponse;
          errorMessage =
            errorResponse.message ||
            errorResponse.error ||
            'An unknown error occurred';
        }

        setError(errorMessage);
        return null;
      } finally {
        console.log(
          '[useAIImageGeneration] Image generation process completed.',
        );
        setIsGenerating(false);
        abortControllerRef.current = null;
      }
    },
    [fetchWithRetry],
  );

  const cancelOngoingRequests = useCallback(() => {
    if (abortControllerRef.current) {
      console.log('[useAIImageGeneration] Cancelling ongoing requests.');
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const clearImages = useCallback(() => {
    setGeneratedImages([]);
    console.log('[useAIImageGeneration] Cleared all generated images.');
  }, []);

  return {
    generateImage,
    isGenerating,
    error,
    resetError,
    generatedImages,
    clearImages,
    cancelOngoingRequests,
  };
};
