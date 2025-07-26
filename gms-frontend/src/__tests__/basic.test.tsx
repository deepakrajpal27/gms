import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import Inventory from '../pages/Inventory';
import { NotificationProvider } from '../context/NotificationContext';
import { CartProvider } from '../context/CartContext';
import React from 'react';

// Helper to wrap components with providers
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NotificationProvider>
    <CartProvider>{children}</CartProvider>
  </NotificationProvider>
);

describe('App basic rendering', () => {
  it('renders without crashing', () => {
    render(<App />, { wrapper: Providers });
    expect(screen.getByText(/Grocery Management System/i)).toBeInTheDocument();
  });
});

describe('Inventory page', () => {
  it('renders Inventory title', () => {
    render(<Inventory />, { wrapper: Providers });
    expect(screen.getByText(/Inventory/i)).toBeInTheDocument();
  });

  it('shows Add Product button', () => {
    render(<Inventory />, { wrapper: Providers });
    expect(screen.getByRole('button', { name: /Add Product/i })).toBeInTheDocument();
  });

  it('opens Add Product dialog on button click', async () => {
    render(<Inventory />, { wrapper: Providers });
    fireEvent.click(screen.getByRole('button', { name: /Add Product/i }));
    await waitFor(() => {
      expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
    });
  });

  it('shows Inventory table headers', () => {
    render(<Inventory />, { wrapper: Providers });
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();
  });

  it('shows loading indicator when loading', () => {
    render(<Inventory />, { wrapper: Providers });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows no inventory message when list is empty', async () => {
    render(<Inventory />, { wrapper: Providers });
    await waitFor(() => {
      expect(screen.getByText(/No inventory items found/i)).toBeInTheDocument();
    });
  });
});
