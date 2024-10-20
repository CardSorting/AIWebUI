// components/ReviewOrderStep.tsx

import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import { OrderItem } from '@/types'; // Define this type appropriately

interface ReviewOrderStepProps {
  orderItems: OrderItem[];
  calculateTotalPrice: () => number;
  handleBack: () => void;
  handleNext: () => void;
}

const ReviewOrderStep: React.FC<ReviewOrderStepProps> = ({ orderItems, calculateTotalPrice, handleBack, handleNext }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Review Your Order
      </Typography>
      <List>
        {orderItems.map((item, index) => (
          <ListItem key={item.id} divider>
            <ListItemText 
              primary={`Card ${index + 1}: ${item.uploadedImage?.name}`} 
              secondary={
                <>
                  <Typography variant="body2">Size: {item.printOptions.size.charAt(0).toUpperCase() + item.printOptions.size.slice(1)}</Typography>
                  <Typography variant="body2">Quantity: {item.printOptions.quantity}</Typography>
                  <Typography variant="body2">Total Price: ${(item.printOptions.quantity * getPricePerUnit(item.printOptions.quantity) / 100).toFixed(2)}</Typography>
                </>
              } 
            />
          </ListItem>
        ))}
        {/* Total Summary */}
        <ListItem>
          <ListItemText 
            primary={
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Total Price
              </Typography>
            } 
            secondary={
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                ${calculateTotalPrice().toFixed(2)}
              </Typography>
            } 
          />
        </ListItem>
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" onClick={handleBack} aria-label="Previous Step">
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} aria-label="Proceed to Checkout">
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewOrderStep;

// Helper function should be accessible or duplicated here
const getPricePerUnit = (quantity: number): number => {
  for (const tier of pricingTiers) {
    if (
      quantity >= tier.minQuantity &&
      (tier.maxQuantity === null || quantity <= tier.maxQuantity)
    ) {
      return tier.pricePerUnit;
    }
  }
  // Fallback price if no tier matches
  return 1200; // $12.00
};