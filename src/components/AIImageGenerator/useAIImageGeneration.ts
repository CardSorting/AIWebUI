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
  fullResult: any;
  queueUpdates: any[];
}

interface ImageMetadata {
  id: string;
  prompt: string;
  imageUrl: string;
  fullResult: any;
  createdAt: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const useAIImageGeneration = () => {
  // Lazy initializer to load images from localStorage on client-side
  const [generatedImages, setGeneratedImages] = useState<ImageMetadata[]>(() => {
    if (typeof window !== 'undefined') {
      const storedImages = localStorage.getItem('generatedImages');
      if (storedImages) {
        try {
          const parsedImages: ImageMetadata[] = JSON.parse(storedImages);
          console.log('[useAIImageGeneration] Loaded generated images from localStorage:', parsedImages);
          return parsedImages;
        } catch (error) {
          console.error('[useAIImageGeneration] Failed to parse generated images from localStorage:', error);
          localStorage.removeItem('generatedImages'); // Optionally clear corrupted data
        }
      }
    }
    return [];
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
          id: uuidv4(),
          prompt,
          imageUrl,
          fullResult,
          createdAt: new Date().toISOString(),
        };
        setGeneratedImages((prevImages) => {
          const updatedImages = [newImage, ...prevImages];
          console.log('[useAIImageGeneration] Updated generatedImages state:', updatedImages);
          return updatedImages;
        });
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
   * Save generated images to localStorage whenever they change.
   */
  useEffect(() => {
    console.log('[useAIImageGeneration] Saving generated images to localStorage.');
    if (typeof window !== 'undefined') { // Ensure it's client-side
      try {
        const json = JSON.stringify(generatedImages);
        console.log('[useAIImageGeneration] JSON to save:', json);
        localStorage.setItem('generatedImages', json);
        console.log('[useAIImageGeneration] Saved generated images to localStorage.');
      } catch (storageError) {
        console.error('[useAIImageGeneration] Failed to save generated images to localStorage:', storageError);
        setError('Failed to save images for persistence.');
      }
    }
  }, [generatedImages]);

  /**
   * Clears all generated images from state and localStorage.
   */
  const clearImages = useCallback(() => {
    setGeneratedImages([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('generatedImages');
    }
    console.log('[useAIImageGeneration] Cleared all generated images.');
  }, []);

  return { 
    generateImage, 
    isGenerating, 
    error, 
    resetError, 
    generatedImages,
    clearImages, // Exposed to allow clearing images from the component
    cancelOngoingRequests
  };
};