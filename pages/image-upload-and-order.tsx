// pages/image-upload-and-order.tsx

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Container,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,
  Link,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CompareIcon from '@mui/icons-material/Compare';

import { pricingTiers, PricingTier } from '../src/config/pricing';

// Define the available card sizes without price
const cardSizes = [
  { label: 'Standard (2.5" x 3.5")', value: 'standard' },
  { label: 'Large (3.5" x 5")', value: 'large' },
];

// Styled component for image previews
const ImagePreview = styled('img')(({ theme }) => ({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

const UploadButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface OrderItem {
  id: string;
  file: File;
  preview: string;
  size: string;
  quantity: number;
}

const ImageUploadAndOrderPage: NextPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState('/hero-image.jpg');
  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Handle tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle thumbnail click to change main image
  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  // Handle file uploads (single file)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit

      if (!isValidType || !isValidSize) {
        setSnackbar({
          open: true,
          message: `File ${file.name} is invalid. Only JPEG/PNG under 5MB are allowed.`,
          severity: 'error',
        });
        return;
      }

      const newOrderItem: OrderItem = {
        id: `${file.name}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file),
        size: 'standard',
        quantity: 1,
      };

      // If an order item already exists, revoke its object URL to prevent memory leaks
      if (orderItem) {
        URL.revokeObjectURL(orderItem.preview);
      }

      setOrderItem(newOrderItem);
    }
  };

  // Handle removing the order item
  const handleRemoveItem = () => {
    if (orderItem) {
      URL.revokeObjectURL(orderItem.preview);
      setOrderItem(null);
    }
  };

  // Handle size change for the order item
  const handleSizeChange = (size: string) => {
    if (orderItem) {
      setOrderItem({
        ...orderItem,
        size,
      });
    }
  };

  // Handle quantity change for the order item
  const handleOrderItemQuantityChange = (newQuantity: number) => {
    if (orderItem) {
      setOrderItem({
        ...orderItem,
        quantity: Math.max(1, newQuantity),
      });
    }
  };

  // Determine price per unit based on quantity (per item)
  const getPricePerUnit = (quantity: number): number => {
    console.log(`Calculating price per unit for quantity: ${quantity}`);
    for (const tier of pricingTiers) {
      if (
        quantity >= tier.minQuantity &&
        (tier.maxQuantity === null || quantity <= tier.maxQuantity)
      ) {
        console.log(`Matched Pricing Tier: ${JSON.stringify(tier)}`);
        return tier.pricePerUnit;
      }
    }
    // Fallback price if no tier matches
    console.warn('No pricing tier matched. Using fallback price of $5.00');
    return 500; // $5.00
  };

  // Calculate total price (single order item)
  const calculateTotal = (): string => {
    if (!orderItem) return '0.00';
    const { quantity } = orderItem;
    const pricePerUnit = getPricePerUnit(quantity);
    const totalPriceCents = quantity * pricePerUnit;
    console.log(`Total Quantity: ${quantity}, Price Per Unit: ${pricePerUnit}, Total Price (cents): ${totalPriceCents}`);
    return (totalPriceCents / 100).toFixed(2);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!orderItem) {
      setSnackbar({
        open: true,
        message: 'Please upload an image.',
        severity: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      // Placeholder for actual order processing logic (e.g., API call)
      // Simulating order processing with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSnackbar({
        open: true,
        message: 'Your order has been placed successfully!',
        severity: 'success',
      });
      handleRemoveItem(); // Clear the order item after successful submission
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to place the order. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Cleanup object URL to prevent memory leaks when component unmounts or orderItem changes
  useEffect(() => {
    return () => {
      if (orderItem) {
        URL.revokeObjectURL(orderItem.preview);
      }
    };
  }, [orderItem]);

  return (
    <>
      <Head>
        <title>Custom Trading Cards | PrintMoreTCG</title>
        <meta
          name="description"
          content="Design and print your own custom trading cards. High-quality printing, multiple sizes, and fast shipping. Perfect for games, collections, or gifts."
        />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Custom Trading Cards</Typography>
        </Breadcrumbs>

        <Grid container spacing={6}>
          {/* Product Images and Information */}
          <Grid item xs={12} md={7}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="400"
                image={selectedImage}
                alt="Custom Trading Cards"
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  {[
                    '/hero-image.jpg',
                    '/sample-card1.jpg',
                    '/sample-card2.jpg',
                    '/sample-card3.jpg',
                  ].map((img, index) => (
                    <ImagePreview
                      key={index}
                      src={img}
                      alt={`Sample Card ${index + 1}`}
                      sx={{
                        width: '23%',
                        height: '100px',
                        cursor: 'pointer',
                        border:
                          selectedImage === img
                            ? '2px solid #1976d2'
                            : '1px solid #ccc',
                      }}
                      onClick={() => handleThumbnailClick(img)}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ mt: 4 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="product information tabs"
                variant="fullWidth"
              >
                <Tab label="Description" />
                <Tab label="Specifications" />
                <Tab label="Reviews" />
                <Tab label="FAQ" />
              </Tabs>
              <TabPanel value={tabValue} index={0}>
                <Typography variant="body1" paragraph>
                  Create your own unique trading cards with our high-quality custom
                  printing service. Whether you're designing cards for your own
                  game, creating collectibles, or making personalized gifts, our
                  cards are perfect for bringing your ideas to life.
                </Typography>
                <Typography variant="body1" paragraph>
                  Our state-of-the-art printing process ensures vibrant colors, sharp
                  details, and a professional finish. Choose from multiple sizes to
                  suit your needs, and enjoy the flexibility of ordering any quantity
                  you desire.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="High-quality 350gsm cardstock" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Full-color printing on both sides" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Multiple size options" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="No minimum order quantity" />
                  </ListItem>
                </List>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  Product Specifications
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Material"
                      secondary="350gsm premium cardstock"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Printing"
                      secondary="Full-color CMYK printing on both sides"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Finish"
                      secondary="Gloss or Matte lamination available"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Sizes"
                      secondary="2.5 x 3.5 inches, 3 x 4 inches, 3.5 x 5 inches"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Turnaround Time"
                      secondary="3-5 business days"
                    />
                  </ListItem>
                </List>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Customer Reviews
                </Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                >
                  <Rating
                    value={4.7}
                    readOnly
                    precision={0.1}
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2">
                    4.7 out of 5 stars (based on 152 reviews)
                  </Typography>
                </Box>
                {/* Detailed Reviews */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="review1-content"
                    id="review1-header"
                  >
                    <Typography>John D. - 5 stars</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Excellent quality cards! The colors are vibrant and the
                      printing is sharp. I'm very impressed with the final product.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="review2-content"
                    id="review2-header"
                  >
                    <Typography>Sarah M. - 4 stars</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Great cards overall. The only reason I'm not giving 5 stars
                      is because the shipping took a bit longer than expected.
                      But the quality is top-notch!
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                {/* Add more reviews as needed */}
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" gutterBottom>
                  Frequently Asked Questions
                </Typography>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faq1-content"
                    id="faq1-header"
                  >
                    <Typography>
                      What file format should I use for my card designs?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      We recommend using high-resolution PNG or JPEG files for your
                      card designs. For the best results, ensure your images are at
                      least 300 DPI.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faq2-content"
                    id="faq2-header"
                  >
                    <Typography>
                      Can I order a sample before placing a large order?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Yes, you can order a sample pack of different card sizes and
                      finishes. This allows you to see and feel the quality of our
                      cards before placing a larger order.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                {/* Add more FAQs as needed */}
              </TabPanel>
            </Box>
          </Grid>

          {/* Order Form */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Custom Trading Cards
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
              >
                Total: ${calculateTotal()}
              </Typography>
              <Box
                sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
              >
                <Rating
                  value={4.7}
                  readOnly
                  precision={0.1}
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2">
                  (152 reviews)
                </Typography>
              </Box>
              <Chip label="In Stock" color="success" sx={{ mb: 2 }} />
              <form onSubmit={handleSubmit}>
                {/* Upload Button */}
                <UploadButton
                  variant="contained"
                  component="label"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                  size="large"
                >
                  Upload Card Design
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    // Removed 'multiple' to allow only one file
                    onChange={handleFileChange}
                  />
                </UploadButton>

                {/* Display Uploaded Image */}
                {orderItem && (
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12}>
                      <Card>
                        <Grid container>
                          <Grid item xs={4}>
                            <ImagePreview
                              src={orderItem.preview}
                              alt={orderItem.file?.name || 'Uploaded Image'}
                            />
                          </Grid>
                          <Grid item xs={8}>
                            <CardContent>
                              <Typography
                                variant="subtitle1"
                                noWrap
                              >
                                {orderItem.file?.name || 'Unknown'}
                              </Typography>
                              {/* Size Selection */}
                              <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="size-select-label">
                                  Size
                                </InputLabel>
                                <Select
                                  labelId="size-select-label"
                                  id="size-select"
                                  value={orderItem.size}
                                  label="Size"
                                  onChange={(e) =>
                                    handleSizeChange(
                                      e.target.value as string
                                    )
                                  }
                                >
                                  {cardSizes.map((size) => (
                                    <MenuItem
                                      key={size.value}
                                      value={size.value}
                                    >
                                      {size.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              {/* Quantity Selection */}
                              <TextField
                                type="number"
                                label="Quantity"
                                value={orderItem.quantity}
                                onChange={(e) =>
                                  handleOrderItemQuantityChange(
                                    Math.max(
                                      1,
                                      parseInt(e.target.value) || 1
                                    )
                                  )
                                }
                                fullWidth
                                sx={{ mt: 2 }}
                                inputProps={{ min: 1 }}
                              />
                              {/* Remove Button */}
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={handleRemoveItem}
                                startIcon={<DeleteIcon />}
                                sx={{ mt: 2 }}
                                fullWidth
                              >
                                Remove
                              </Button>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                <Divider sx={{ my: 3 }} />

                {/* Add to Cart Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  sx={{ py: 2, mb: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Add to Cart'}
                </Button>

                {/* Additional Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Tooltip title="Add to Wishlist">
                    <IconButton aria-label="add to wishlist">
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Compare">
                    <IconButton aria-label="compare">
                      <CompareIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </form>

              {/* Why Choose Us Section */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Why Choose Us
                </Typography>
                <List>
                  <ListItem>
                    <LocalShippingIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <ListItemText
                      primary="Fast Shipping"
                      secondary="3-5 business days"
                    />
                  </ListItem>
                  <ListItem>
                    <SecurityIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <ListItemText
                      primary="Secure Payments"
                      secondary="SSL encrypted checkout"
                    />
                  </ListItem>
                  <ListItem>
                    <Chip
                      label="Best Quality"
                      color="primary"
                      sx={{ mr: 2 }}
                    />
                    <ListItemText
                      primary="Premium Materials"
                      secondary="High-grade cardstock and inks"
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Snackbar for Notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() =>
            setSnackbar((prev) => ({ ...prev, open: false }))
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() =>
              setSnackbar((prev) => ({ ...prev, open: false }))
            }
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default ImageUploadAndOrderPage;