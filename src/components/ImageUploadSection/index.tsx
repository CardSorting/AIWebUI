// src/components/ImageUploadSection/index.tsx

import React, { FC } from 'react';
import { Grid, Card, CardMedia, CardActionArea } from '@mui/material';
import FileUploader from '@components/inputs/FileUploader';
import { FileUploaderProps } from '@components/inputs/FileUploader/types';

// Remove the AIImageGenerator import and related logic

const ImageUploadSection: FC<FileUploaderProps> = props => {
  // Remove AI image generation related state and functions

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FileUploader {...props} />
      </Grid>
      {/* Remove the AI image generation card */}
    </Grid>
  );
};

export default ImageUploadSection;
