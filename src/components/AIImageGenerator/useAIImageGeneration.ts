// src/components/AIImageGenerator/useAIImageGeneration.ts

import { useState, useCallback, useRef, useEffect } from 'react';

interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
}

interface GenerateImageResponse {
  imageUrl: string | null;
  fullResult: any;
  queueUpdates?: any[];
}

interface ImageMetadata {
  id: number;
  prompt: string;
  imageUrl: string;
  fullResult: any;
  createdAt: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const useAIImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<ImageMetadata[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Resets the error state to null.
   */
  const resetError = useCallback(() => {
    console.log('[useAIImageGeneration] Resetting error state to null.');
    setError(null);
  }, []);

  /**
   * Utility function to introduce a delay.
   * @param ms Milliseconds to delay.
   */
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Fetch wrapper with retry logic.
   * @param url The URL to fetch.
   * @param options Fetch options.
   * @param retries Number of retries left.
   * @returns The fetch response.
   */
  const fetchWithRetry = useCallback(async (url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (err) {
      if (retries > 0 && !abortControllerRef.current?.signal.aborted) {
        console.log(`[useAIImageGeneration] Retrying fetch... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        await delay(RETRY_DELAY);
        return fetchWithRetry(url, options, retries - 1);
      }
      throw err;
    }
  }, []);

  /**
   * Generates an image based on the provided prompt and options.
   * @param prompt The description for the image generation.
   * @param options Optional image generation options.
   * @returns The generated image data or null if failed.
   */
  const generateImage = useCallback(async (prompt: string, options?: any): Promise<GenerateImageResponse | null> => {
    console.log('[useAIImageGeneration] Starting image generation with prompt:', prompt);
    setIsGenerating(true);
    setError(null);

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();

    try {
      console.log('[useAIImageGeneration] Sending POST request to /api/generate-image with payload:', { prompt, options });

      const response = await fetchWithRetry('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, ...options }),
        signal: abortControllerRef.current.signal,
      });

      console.log('[useAIImageGeneration] Received response from /api/generate-image');
      console.log('[useAIImageGeneration] Response status:', response.status);
      console.log('[useAIImageGeneration] Response successful:', response.ok);

      const data: GenerateImageResponse = await response.json();
      console.log('[useAIImageGeneration] Parsed JSON response:', data);

      const { imageUrl, fullResult, queueUpdates } = data;
      console.log('[useAIImageGeneration] Generated image URL:', imageUrl);
      console.log('[useAIImageGeneration] Full result data:', fullResult);
      console.log('[useAIImageGeneration] Queue updates data:', queueUpdates);

      if (imageUrl) {
        const newImage: ImageMetadata = {
          id: Date.now(),
          prompt,
          imageUrl,
          fullResult,
          createdAt: new Date().toISOString(),
        };
        setGeneratedImages((prevImages) => [newImage, ...prevImages]);
      } else {
        console.warn('[useAIImageGeneration] No imageUrl found in the API response.');
        setError('Image generation failed. No image URL was returned.');
      }

      return { imageUrl, fullResult, queueUpdates };
    } catch (err) {
      console.error('[useAIImageGeneration] Exception caught in generateImage:', err);

      let errorMessage = 'An unknown error occurred during image generation.';
      if (err instanceof Error) {
        errorMessage = err.message;
        console.error('[useAIImageGeneration] Error message:', errorMessage);
        console.error('[useAIImageGeneration] Error stack trace:', err.stack);
      } else if (typeof err === 'object' && err !== null) {
        const errorResponse = err as ErrorResponse;
        errorMessage = errorResponse.message || errorResponse.error || 'An unknown error occurred';
        console.error('[useAIImageGeneration] Error object received:', errorResponse);
      }

      setError(errorMessage);
      return null;
    } finally {
      console.log('[useAIImageGeneration] Image generation process completed.');
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  }, [fetchWithRetry]);

  /**
   * Fetches all previously generated images.
   */
  const fetchGeneratedImages = useCallback(async () => {
    console.log('[useAIImageGeneration] Initiating fetch for generated images.');
    setIsLoadingImages(true);
    setError(null);

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();

    try {
      console.log('[useAIImageGeneration] Sending GET request to /api/get-generated-images');
      const response = await fetchWithRetry('/api/get-generated-images', {
        signal: abortControllerRef.current.signal,
      });

      console.log('[useAIImageGeneration] Received response from /api/get-generated-images');
      console.log('[useAIImageGeneration] Response status:', response.status);
      console.log('[useAIImageGeneration] Response successful:', response.ok);

      const data: ImageMetadata[] = await response.json();
      console.log('[useAIImageGeneration] Generated images data retrieved successfully:', data);
      setGeneratedImages(data);
    } catch (err) {
      console.error('[useAIImageGeneration] Exception caught while fetching generated images:', err);

      let errorMessage = 'An error occurred while fetching generated images.';
      if (err instanceof Error) {
        errorMessage = err.message;
        console.error('[useAIImageGeneration] Error message:', errorMessage);
        console.error('[useAIImageGeneration] Error stack trace:', err.stack);
      } else if (typeof err === 'object' && err !== null) {
        const errorResponse = err as ErrorResponse;
        errorMessage = errorResponse.message || errorResponse.error || 'An unknown error occurred';
        console.error('[useAIImageGeneration] Error object received:', errorResponse);
      }

      setError(errorMessage);
    } finally {
      console.log('[useAIImageGeneration] Fetch generated images process completed.');
      setIsLoadingImages(false);
      abortControllerRef.current = null;
    }
  }, [fetchWithRetry]);

  /**
   * Cancels any ongoing fetch requests.
   */
  const cancelOngoingRequests = useCallback(() => {
    if (abortControllerRef.current) {
      console.log('[useAIImageGeneration] Cancelling ongoing requests.');
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  /**
   * Load generated images from localStorage on mount.
   */
  useEffect(() => {
    const storedImages = localStorage.getItem('generatedImages');
    if (storedImages) {
      setGeneratedImages(JSON.parse(storedImages));
    }
  }, []);

  /**
   * Save generated images to localStorage whenever they change.
   */
  useEffect(() => {
    localStorage.setItem('generatedImages', JSON.stringify(generatedImages));
  }, [generatedImages]);

  return { 
    generateImage, 
    isGenerating, 
    error, 
    resetError, 
    generatedImages,
    isLoadingImages,
    fetchGeneratedImages,
    cancelOngoingRequests
  };
};git