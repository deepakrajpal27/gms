import React from 'react';
import { Typography, Button } from '@mui/material';
import PageContainer from '../components/PageContainer';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cartItemsCount, clearCart } = useCart();

  return (
    <PageContainer>
      <Typography variant="h4" component="h1" className="page-title">
        Shopping Cart
      </Typography>
      <Typography variant="body1" className="page-content">
        You have {cartItemsCount} items in your cart.
      </Typography>
      {cartItemsCount > 0 && (
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={clearCart}
          sx={{ mt: 2 }}
        >
          Clear Cart
        </Button>
      )}
    </PageContainer>
  );
};

export default Cart;
