import React from 'react';
import { Typography, Button } from '@mui/material';
import PageContainer from '../components/PageContainer';
import { useCart } from '../context/CartContext';

const Inventory: React.FC = () => {
  const { addToCart } = useCart();

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
