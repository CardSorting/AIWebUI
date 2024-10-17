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
  CardMedia, 
  CardContent, 
  CardActions 
} from '@mui/material';
import NextLink from 'next/link';
import Routes from '@routes';
import { useAIImageGeneration } from '@components/AIImageGenerator/useAIImageGeneration';

interface ImageGenerationOptions {
  imageSize: string;
  quantity: number;
  style?: string;
  colorPalette?: string;
}

const AIImageGeneratorPage: React.FC = () => {
  const {
    generateImage,
    isGenerating,
    error: apiError,
    resetError,
    generatedImages,
    isLoadingImages,
    fetchGeneratedImages,
    cancelOngoingRequests
  } = useAIImageGeneration();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

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
          <Grid container spacing={4}>
            {generatedImages.length > 0 ? (
              generatedImages.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image.imageUrl}
                      alt="Generated Pokémon"
                      onError={() => {
                        console.error(`[AIImageGeneratorPage] Error loading image with ID ${image.id}.`);
                        setLocalError('Failed to load one or more images.');
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" gutterBottom>
                        {image.prompt}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        color="primary" 
                        href={image.imageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Image
                      </Button>
                      <Button 
                        size="small" 
                        color="secondary" 
                        onClick={() => {
                          if (image.imageUrl) {
                            navigator.clipboard.writeText(image.imageUrl);
                            setSuccessMessage('Image URL copied to clipboard!');
                          }
                        }}
                      >
                        Copy URL
                      </Button>
                      <Button 
                        size="small" 
                        color="success" 
                        onClick={() => {
                          if (image.imageUrl) {
                            // Trigger download
                            const link = document.createElement('a');
                            link.href = image.imageUrl;
                            link.download = `pokemon-card-${image.id}.jpg`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            setSuccessMessage('Image downloaded successfully!');
                          }
                        }}
                      >
                        Download
                      </Button>
                      {/* Share Button (e.g., Twitter) */}
                      <Button 
                        size="small" 
                        color="info" 
                        onClick={() => {
                          if (image.imageUrl) {
                            const tweetText = encodeURIComponent(`Check out this Pokémon card I generated: ${image.imageUrl}`);
                            window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
                          }
                        }}
                      >
                        Share
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  No images generated yet.
                </Typography>
              </Grid>
            )}
          </Grid>

          {/* Loading Indicator for Gallery */}
          {isLoadingImages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Button to Fetch More Images */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={fetchGeneratedImages}
              disabled={isLoadingImages}
              sx={{ px: 4 }}
            >
              {isLoadingImages ? <CircularProgress size={24} /> : 'Load More Images'}
            </Button>
          </Box>
        </Box>

        {/* View Gallery Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <NextLink href={Routes.Gallery} passHref>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => console.log('[AIImageGeneratorPage] Navigating to Gallery.')}
              data-testid="view-gallery-button"
            >
              View Generated Images Gallery
            </Button>
          </NextLink>
        </Box>
      </Box>
    </>
  );
};

export default AIImageGeneratorPage;