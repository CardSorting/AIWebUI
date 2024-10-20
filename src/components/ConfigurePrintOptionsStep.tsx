// components/ConfigurePrintOptionsStep.tsx

import React from 'react';
import { Box, Button, Typography, Grid, Paper, IconButton, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { OrderItem, PrintOptions } from '@/types'; // Define these types appropriately

interface ConfigurePrintOptionsStepProps {
  orderItems: OrderItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  handleBack: () => void;
  handleNext: () => void;
  calculatePriceItem: (options: PrintOptions) => { unitPrice: number; totalPrice: number };
}

const ConfigurePrintOptionsStep: React.FC<ConfigurePrintOptionsStepProps> = ({ orderItems, setOrderItems, handleBack, handleNext, calculatePriceItem }) => {

  const handleSizeChange = (id: string, size: string) => {
    const updatedItems = orderItems.map(item => 
      item.id === id ? { ...item, printOptions: { ...item.printOptions, size } } : item
    );
    setOrderItems(updatedItems);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    const updatedItems = orderItems.map(item => 
      item.id === id ? { ...item, printOptions: { ...item.printOptions, quantity } } : item
    );
    setOrderItems(updatedItems);
  };

  const removeOrderItem = (id: string) => {
    const updatedItems = orderItems.filter(item => item.id !== id);
    setOrderItems(updatedItems);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Configure Print Options
      </Typography>
      <Grid container spacing={3}>
        {orderItems.map((item, index) => {
          const { unitPrice, totalPrice } = calculatePriceItem(item.printOptions);
          return (
            <Grid item xs={12} key={item.id}>
              <Paper 
                elevation={2} 
                sx={{ p: 2, position: 'relative' }}
              >
                <IconButton 
                  aria-label="Remove this card"
                  onClick={() => removeOrderItem(item.id)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <DeleteIcon />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  Card {index + 1}: {item.uploadedImage?.name}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id={`size-label-${item.id}`}>Card Size</InputLabel>
                      <Select
                        labelId={`size-label-${item.id}`}
                        value={item.printOptions.size}
                        label="Card Size"
                        onChange={(e) => handleSizeChange(item.id, e.target.value)}
                        aria-label={`Select size for Card ${index + 1}`}
                      >
                        <MenuItem value="standard">Standard (2.5" x 3.5")</MenuItem>
                        <MenuItem value="large">Large (3.5" x 5")</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Quantity"
                      value={item.printOptions.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Math.max(1, Number(e.target.value)))}
                      inputProps={{ min: 1 }}
                      aria-label={`Set quantity for Card ${index + 1}`}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Unit Price: ${(unitPrice / 100).toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    Total Price: ${(totalPrice / 100).toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" onClick={handleBack} aria-label="Previous Step">
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} aria-label="Next Step">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ConfigurePrintOptionsStep;