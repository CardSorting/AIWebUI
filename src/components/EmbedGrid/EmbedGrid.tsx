// src/components/EmbedGrid/EmbedGrid.tsx

import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Pagination } from '@mui/material';

interface EmbedData {
  imageUrl: string | null;
  fullResult: any;
}

interface EmbedGridProps {
  embeds: EmbedData[];
  itemsPerPage: number;
}

const EmbedGrid: React.FC<EmbedGridProps> = ({ embeds, itemsPerPage }) => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState<EmbedData[]>([]);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPageData(embeds.slice(startIndex, endIndex));
  }, [page, embeds, itemsPerPage]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Grid container spacing={3}>
        {pageData.map((embed, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={embed.imageUrl || '/placeholder.jpg'}
                alt="Generated Image"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Seed:</strong> {embed.fullResult.seed}<br />
                  <strong>Prompt:</strong> {embed.fullResult.input.prompt}<br />
                  <strong>Image Details:</strong><br />
                  Width: {embed.fullResult.images[0]?.width}<br />
                  Height: {embed.fullResult.images[0]?.height}<br />
                  Type: {embed.fullResult.images[0]?.content_type}<br />
                  <strong>NSFW Concepts:</strong> {embed.fullResult.has_nsfw_concepts?.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(embeds.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
};

export default EmbedGrid;