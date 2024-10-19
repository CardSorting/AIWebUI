// src/pages/ai-image-gallery.tsx

import React, { useEffect } from 'react';
import { SEO } from '@layout';
import { Box, Typography, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import { useAIImageGeneration } from '@components/AIImageGenerator/useAIImageGeneration';
import Image from 'next/image';

const GalleryPage: React.FC = () => {
  const { 
    generatedImages, 
    isLoadingImages, 
    error, 
    fetchGeneratedImages 
  } = useAIImageGeneration();

  // Fetch generated images when the component mounts
  useEffect(() => {
    fetchGeneratedImages();
  }, [fetchGeneratedImages]);

  return (
    <>
      <SEO title="AI Generated Image Gallery" description="View AI-generated Pokémon card images" />
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 4 }}>
        {/* Header Section */}
        <Typography variant="h3" component="h1" gutterBottom align="center">
          AI Generated Image Gallery
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Loading Indicator */}
        {isLoadingImages ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* No Images Message */}
            {generatedImages.length === 0 ? (
              <Typography variant="h6" align="center" color="text.secondary">
                No images generated yet. Start creating your own Pokémon card images!
              </Typography>
            ) : (
              /* Images Grid */
              <Grid container spacing={4}>
                {generatedImages.map((image) => (
                  <Grid item xs={12} sm={6} md={4} key={image.id}>
                    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Prompt as Title */}
                      <Typography variant="h6" gutterBottom noWrap>
                        {image.prompt}
                      </Typography>

                      {/* Image Display */}
                      <Box sx={{ position: 'relative', width: '100%', paddingTop: '75%', mb: 2 }}>
                        <Image 
                          src={image.imageUrl} 
                          alt={image.prompt} 
                          layout="fill"
                          objectFit="cover"
                          placeholder="blur"
                          blurDataURL="/placeholder.png" // Optional: Placeholder image
                        />
                      </Box>

                      {/* Image Metadata */}
                      <Typography variant="body2" color="text.secondary">
                        Created: {new Date(image.createdAt).toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default GalleryPage;