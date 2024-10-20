import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Chip,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';

interface Order {
  id: string;
  status: string;
  imageMetadata: {
    prompt: string;
    imageUrl: string;
  };
  printOptions: {
    size: string;
    quantity: number;
  };
  createdAt: string;
}

const AdminPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/get-orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/update-order-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      await fetchOrders(); // Refresh the order list
      setSnackbar({ open: true, message: 'Order status updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating order status:', error);
      setSnackbar({ open: true, message: 'Failed to update order status', severity: 'error' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'processing':
        return 'primary';
      case 'shipped':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Panel - Manage Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Prompt</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id.slice(0, 8)}</TableCell>
                <TableCell>
                  <img src={order.imageMetadata.imageUrl} alt={order.imageMetadata.prompt} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                </TableCell>
                <TableCell>{order.imageMetadata.prompt.slice(0, 30)}...</TableCell>
                <TableCell>{order.printOptions.size}</TableCell>
                <TableCell>{order.printOptions.quantity}</TableCell>
                <TableCell>
                  <Chip label={order.status} color={getStatusColor(order.status)} />
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => handleUpdateStatus(order.id, 'processing')}
                    disabled={order.status !== 'pending'}
                  >
                    Process
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => handleUpdateStatus(order.id, 'shipped')}
                    disabled={order.status !== 'processing'}
                    sx={{ ml: 1 }}
                  >
                    Ship
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;