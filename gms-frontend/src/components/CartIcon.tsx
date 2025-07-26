import React from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartIcon: React.FC = () => {
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();

  return (
    <IconButton 
      color="inherit" 
      onClick={() => navigate('/cart')}
      sx={{ ml: 2 }}
    >
      <Badge badgeContent={cartItemsCount} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
