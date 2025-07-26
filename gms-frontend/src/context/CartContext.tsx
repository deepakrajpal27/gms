import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cartItemsCount: number;
  addToCart: () => void;
  removeFromCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addToCart = () => {
    setCartItemsCount(prev => prev + 1);
  };

  const removeFromCart = () => {
    setCartItemsCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  const clearCart = () => {
    setCartItemsCount(0);
  };

  return (
    <CartContext.Provider value={{ cartItemsCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
