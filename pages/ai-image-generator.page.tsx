// src/pages/ai-image-generator.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { SEO } from '@layout';
import AIImageGenerator from '@components/AIImageGenerator';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Alert, 
  CircularProgress, 
  Snackbar, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import Image from 'next/image';
import { useAIImageGeneration } from '@components/AIImageGenerator/useAIImageGeneration';
import CloseIcon from '@mui/icons-material/Close';

interface ImageGenerationOptions {
  imageSize: string;
  quantity: number;
  style?: string;
  colorPalette?: string;
}

interface ImageMetadata {
  id: string;
  prompt: string;
  imageUrl: string;
  fullResult: any;
  createdAt: string;
}

const AIImageGeneratorPage: React.FC = () => {
  const {
    generateImage,
    isGenerating,
    error: apiError,
    resetError,
    generatedImages,
    clearImages, // Function to clear images
    cancelOngoingRequests
  } = useAIImageGeneration();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(null); // For Modal

  useEffect(() => {
    console.log('[AIImageGeneratorPage] Component mounted.');

    return () => {
      console.log('[AIImageGeneratorPage] Component unmounted.');
      cancelOngoingRequests();
    };
  }, [cancelOngoingRequests]);

  useEffect(() => {
    if (apiError) {
      setLocalError(apiError);
    }
  }, [apiError]);

  /**
   * Handles image generation submission.
   * @param prompt The prompt entered by the user.
   * @param options Optional image generation options.
   */
  const handleImageGeneration = useCallback(async (prompt: string, options?: ImageGenerationOptions) => {
    console.log('[AIImageGeneratorPage] Starting image generation with prompt:', prompt);
    resetError();
    setLocalError(null);
    setSuccessMessage(null);

    try {
      const result = await generateImage(prompt, options);
      if (result) {
        if (result.imageUrl) {
          console.log('[AIImageGeneratorPage] Image generated successfully:', result.imageUrl);
          setSuccessMessage('Image generated successfully!');
        } else {
          console.warn('[AIImageGeneratorPage] Image generation completed, but no image URL was returned.');
          setLocalError('Image generation completed, but no image was returned.');
        }
      }
    } catch (err) {
      console.error('[AIImageGeneratorPage] Error during image generation:', err);
      setLocalError('An unexpected error occurred during image generation.');
    }
  }, [generateImage, resetError]);

  /**
   * Handles dismissing success and error messages.
   */
  const handleDismissMessage = useCallback(() => {
    console.log('[AIImageGeneratorPage] Dismissing message.');
    setSuccessMessage(null);
    setLocalError(null);
  }, []);

  /**
   * Utility function to download image as a blob.
   * @param imageUrl The URL of the image to download.
   * @param imageId The unique identifier of the image.
   */
  const downloadImage = async (imageUrl: string, imageId: string) => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pokemon-card-${imageId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setSuccessMessage('Image downloaded successfully!');
    } catch (error) {
      console.error('Error downloading the image:', error);
      setLocalError('Failed to download the image.');
    }
  };

  /**
   * Handles clearing all generated images.
   */
  const handleClearImages = useCallback(() => {
    if (confirm('Are you sure you want to clear all generated images?')) {
      clearImages();
      setSuccessMessage('All images have been cleared.');
    }
  }, [clearImages]);

  return (
    <>
      <SEO title="AI Image Generator" description="Generate Pokémon card images using AI" />
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
        {/* Header Section */}
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Pokémon Card Image Generator
        </Typography>

        {/* Snackbar for Success and Error Messages */}
        <Snackbar
          open={!!successMessage || !!localError}
          autoHideDuration={6000}
          onClose={handleDismissMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleDismissMessage}
            severity={successMessage ? "success" : "error"}
            sx={{ width: '100%' }}
            data-testid={successMessage ? "success-alert" : "error-alert"}
          >
            {successMessage || localError}
          </Alert>
        </Snackbar>

        {/* Image Generation Form */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <AIImageGenerator onSubmit={handleImageGeneration} />
        </Paper>

        {/* Loading Indicator During Image Generation */}
        {isGenerating && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Generating your image...
            </Typography>
          </Box>
        )}

        {/* Display Generated Images Gallery */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Generated Images:
          </Typography>
          {generatedImages.length > 0 ? (
            <>
              <Grid container spacing={4}>
                {generatedImages.map((image) => (
                  <Grid item xs={12} sm={6} md={4} key={image.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Optimized Image Component with Click to Open Modal */}
                      <Box 
                        sx={{ position: 'relative', width: '100%', height: 0, paddingBottom: '75%', cursor: 'pointer' }} 
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={`Generated Pokémon for prompt: ${image.prompt}`}
                          layout="fill"
                          objectFit="cover"
                          onError={() => {
                            console.error(`[AIImageGeneratorPage] Error loading image with ID ${image.id}.`);
                            setLocalError('Failed to load one or more images.');
                          }}
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" gutterBottom>
                          {image.prompt}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Tooltip title="View Image">
                          <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={() => setSelectedImage(image)}
                            aria-label={`View image for prompt: ${image.prompt}`}
                          >
                            {/* Eye Icon SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-1.002C3.432 7.271 7.523 4 12 4c4.477 0 8.568 3.271 10.964 7.32a1.012 1.012 0 010 1.002C20.568 16.729 16.477 20 12 20c-4.477 0-8.568-3.271-10.964-7.678z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </IconButton>
                        </Tooltip>
                        <Button 
                          size="small" 
                          color="secondary" 
                          onClick={() => {
                            if (image.imageUrl) {
                              navigator.clipboard.writeText(image.imageUrl);
                              setSuccessMessage('Image URL copied to clipboard!');
                            }
                          }}
                          aria-label="Copy image URL to clipboard"
                        >
                          Copy URL
                        </Button>
                        <Button 
                          size="small" 
                          color="success" 
                          onClick={() => {
                            if (image.imageUrl) {
                              downloadImage(image.imageUrl, image.id);
                            }
                          }}
                          aria-label="Download image"
                        >
                          Download
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Clear All Images Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearImages}
                  aria-label="Clear all generated images"
                >
                  Clear All Images
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1" align="center">
              No images generated yet.
            </Typography>
          )}
        </Box>

        {/* Image Modal */}
        <Dialog
          open={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          fullWidth
          maxWidth="lg"
          aria-labelledby="image-dialog-title"
        >
          <DialogTitle id="image-dialog-title" sx={{ m: 0, p: 2 }}>
            {selectedImage?.prompt}
            <IconButton
              aria-label="close"
              onClick={() => setSelectedImage(null)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedImage ? (
              <Box
                component="img"
                src={selectedImage.imageUrl}
                alt={`Generated Pokémon for prompt: ${selectedImage.prompt}`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 1,
                }}
                onError={() => {
                  console.error(`[AIImageGeneratorPage] Error loading image with ID ${selectedImage.id}.`);
                  setLocalError('Failed to load the selected image.');
                }}
              />
            ) : (
              <CircularProgress />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedImage(null)} color="primary" aria-label="Close Image Modal">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AIImageGeneratorPage;