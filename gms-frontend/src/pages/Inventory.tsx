import React from 'react';
import { Typography, Button } from '@mui/material';
import PageContainer from '../components/PageContainer';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { createInventoryItem } from '../api/inventoryApi';

const Inventory: React.FC = () => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const handleAddItem = async () => {
    try {
      // Example item, replace with real form data in production
      await createInventoryItem({ name: 'Sample', category: 'General', quantity: 1, price: 10 });
      showNotification('Item added successfully!', 'success');
    } catch (error: any) {
      showNotification(error?.response?.data?.message || 'Failed to add item', 'error');
    }
  };

  return (
    <PageContainer>
      <Typography variant="h4" component="h1" className="page-title">
        Inventory
      </Typography>
      <Typography variant="body1" className="page-content">
        Track your inventory levels here.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddItem}
        sx={{ mt: 2 }}
      >
        Add Item to Inventory (Demo)
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={addToCart}
        sx={{ mt: 2, ml: 2 }}
      >
        Add Item to Cart
      </Button>
    </PageContainer>
  );
};

export default Inventory;
