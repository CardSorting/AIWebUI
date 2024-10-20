import React, { useState, useCallback } from 'react';
import { Box, Button, Grid, Typography, Card, CardMedia, CardActions, CardContent, Modal, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import FileUploader from '@components/inputs/FileUploader';
import { FileUploaderProps } from '@components/inputs/FileUploader/types';

interface UploadedImage {
  id: string;
  src: string;
  name: string;
}

interface PrintOptions {
  size: string;
  quantity: number;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const ImageUploadAndOrder: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({ size: '2.5x3.5', quantity: 1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload: FileUploaderProps['onChange'] = useCallback((name, src) => {
    const newImage: UploadedImage = {
      id: Date.now().toString(),
      src,
      name,
    };
    setUploadedImages(prevImages => [...prevImages, newImage]);
  }, []);

  const handleOrderPrint = (image: UploadedImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setPrintOptions({ size: '2.5x3.5', quantity: 1 });
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setPrintOptions(prevOptions => ({ ...prevOptions, [name]: value }));
  };

  const handleSubmitOrder = async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageId: selectedImage.id,
          printOptions,
        }),
      });

      const session = await response.json();

      const stripe = await stripePromise;
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Upload Images and Order Prints
      </Typography>
      <FileUploader
        label="Upload Image"
        slug="imageUpload"
        buttonText="Click to upload an image"
        onChange={handleImageUpload}
      />
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {uploadedImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={image.src}
                alt={image.name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {image.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleOrderPrint(image)}>
                  Order Print
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Order Print
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Size</InputLabel>
            <Select
              value={printOptions.size}
              name="size"
              onChange={handleOptionChange}
            >
              <MenuItem value="2.5x3.5">2.5x3.5</MenuItem>
              <MenuItem value="4x6">4x6</MenuItem>
              <MenuItem value="8x10">8x10</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Quantity"
            name="quantity"
            value={printOptions.quantity}
            onChange={handleOptionChange}
            inputProps={{ min: 1 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitOrder} sx={{ mt: 2 }}>
            Place Order
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageUploadAndOrder;