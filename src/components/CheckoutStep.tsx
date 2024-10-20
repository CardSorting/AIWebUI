// components/CheckoutStep.tsx

import React from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface CheckoutStepProps {
  handleOrderNow: () => void;
  loading: boolean;
}

const CheckoutStep: React.FC<CheckoutStepProps> = ({ handleOrderNow, loading }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Ready to Checkout
      </Typography>
      <Typography variant="body1" gutterBottom>
        Click the button below to proceed to payment.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOrderNow} 
        startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <ShoppingCartIcon />}
        disabled={loading}
        sx={{ mt: 3, px: 4, py: 1.5, textTransform: 'none', fontSize: '1rem' }}
        aria-label="Proceed to Stripe Checkout"
      >
        {loading ? 'Processing...' : 'Checkout'}
      </Button>
    </Box>
  );
};

export default CheckoutStep;