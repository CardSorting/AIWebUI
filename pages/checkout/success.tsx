import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, CircularProgress } from '@mui/material';

const CheckoutSuccess: React.FC = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (session_id) {
      fetchOrderDetails(session_id as string);
    }
  }, [session_id]);

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/get-order-details?sessionId=${sessionId}`);
      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (!orderDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="body1">
        Your order has been successfully placed. We'll process your print soon.
      </Typography>
      <Box mt={4}>
        <Typography variant="h6">Order Details:</Typography>
        <Typography>Order ID: {orderDetails.id}</Typography>
        <Typography>Image: {orderDetails.imageMetadata.prompt}</Typography>
        <Typography>Size: {orderDetails.printOptions.size}</Typography>
        <Typography>Quantity: {orderDetails.printOptions.quantity}</Typography>
      </Box>
    </Box>
  );
};

export default CheckoutSuccess;