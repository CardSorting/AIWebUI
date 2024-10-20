import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, IconButton, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface UploadImagesStepProps {
  handleMultipleImageUpload: (name: string, url: string) => void;
  handleNext: () => void;
}

interface UploadedImage {
  id: string;
  name: string;
  url: string;
}

const FileUploader = dynamic(
  () => import('@components/inputs/FileUploader').then((mod) => mod.default),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  }
);

const UploadImagesStep: React.FC<UploadImagesStepProps> = ({ handleMultipleImageUpload, handleNext }) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    fetchUploads();
  }, []);

  // Fetch uploaded images from the API
  const fetchUploads = async () => {
    try {
      const response = await fetch('/api/get-uploads');
      if (response.ok) {
        const data = await response.json();
        const mappedImages = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          url: item.backblazeUrl,
        }));
        setUploadedImages(mappedImages);
      }
    } catch (error) {
      console.error('Error fetching uploads:', error);
    }
  };

  // Handle image upload and add it to the list
  const handleUpload = async (name: string, url: string, metadata: any) => {
    setIsUploading(true);
    try {
      const newImage: UploadedImage = {
        id: metadata.id,
        name: metadata.name,
        url: metadata.backblazeUrl,
      };

      // Ensure the state is updated with the new image
      setUploadedImages((prev) => [...prev, newImage]);

      // Trigger the upload callback
      handleMultipleImageUpload(metadata.name, metadata.backblazeUrl);
    } catch (error) {
      console.error('Error processing uploaded image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle image removal from the UI only
  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Handle drag and drop reordering of images
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(uploadedImages);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    setUploadedImages(reorderedImages);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '800px',
        margin: 'auto',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.02)' },
      }}
    >
      <Typography variant="h5" gutterBottom>
        Upload Your Images
      </Typography>

      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Drag and drop to reorder images. Click the + to add more images.
      </Typography>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: 2,
                width: '100%',
                minHeight: 200,
                padding: 2,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
              }}
            >
              {uploadedImages.length === 0 ? (
                <Box
                  sx={{
                    gridColumn: '1 / -1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    border: `2px dashed ${theme.palette.grey[300]}`,
                    borderRadius: 1,
                    padding: 2,
                    backgroundColor: theme.palette.background.default,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Drag and Drop Images Here
                  </Typography>
                </Box>
              ) : (
                uploadedImages.map((image, index) => (
                  <Draggable key={image.id} draggableId={image.id} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          position: 'relative',
                          height: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `2px dashed ${theme.palette.primary.main}`,
                          borderRadius: 1,
                          padding: 1,
                          transition: 'transform 0.2s',
                          backgroundColor: snapshot.isDragging
                            ? theme.palette.action.hover
                            : theme.palette.background.paper,
                          '&:hover': {
                            transform: 'scale(1.05)',
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <Image
                          src={image.url}
                          alt={image.name}
                          layout="fill"
                          objectFit="cover"
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveImage(image.id)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': { bgcolor: 'rgba(255, 0, 0, 0.7)' },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* File Uploader */}
      <Box sx={{ mt: 3, width: '100%' }}>
        <FileUploader
          label="Upload Image"
          slug="cardImageUpload"
          buttonText="Add Image"
          onChange={handleUpload}
          file={undefined}
          tooltipProps={{
            title: 'Upload an image for your card',
            children: <span>?</span>,
          }}
        />
      </Box>

      {/* Next Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={uploadedImages.length === 0 || isUploading}
          aria-label="Next Step"
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default UploadImagesStep;