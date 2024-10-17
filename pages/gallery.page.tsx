import React from 'react';
import { SEO } from '@layout';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { useAIImageGeneration } from '@components/AIImageGenerator/useAIImageGeneration';
import Image from 'next/image';

const GalleryPage: React.FC = () => {
  const { generatedImages, isLoadingImages, error } = useAIImageGeneration();

  return (
    <>
      <SEO title="AI Generated Image Gallery" description="View AI-generated Pokémon card images" />
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          AI Generated Image Gallery
        </Typography>
        {isLoadingImages ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {generatedImages.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom noWrap>{image.prompt}</Typography>
                  <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
                    <Image 
                      src={image.imageUrl} 
                      alt={image.prompt} 
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Created: {new Date(image.createdAt).toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default GalleryPage;