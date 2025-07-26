import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Box
} from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Inventory from './pages/Inventory';
import Sidebar, { DRAWER_WIDTH, COLLAPSED_DRAWER_WIDTH } from './components/Sidebar';
import CartIcon from './components/CartIcon';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import './styles/App.css';
import Cart from './pages/Cart';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fff',
        },
      },
    },
  },
});

interface AppProps {
  title?: string;
}

const App: React.FC<AppProps> = ({ title = 'Grocery Management System' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarExpandChange = (expanded: boolean) => {
    setSidebarExpanded(expanded);
  };

  const currentWidth = sidebarExpanded ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH;
  return (
    <NotificationProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Box className="app-container">
              <AppBar 
                position="fixed" 
                className="app-bar"
                sx={{ 
                  width: { sm: `calc(100% - ${currentWidth}px)` },
                  ml: { sm: `${currentWidth}px` },
                }}
              >
                <Toolbar className="app-toolbar">
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {title}
                  </Typography>
                  <CartIcon />
                </Toolbar>
              </AppBar>

              <Sidebar 
                mobileOpen={mobileOpen}
                onDrawerToggle={handleDrawerToggle}
                onExpandChange={handleSidebarExpandChange}
              />

              <Box
                component="main"
                className="main-content"
                sx={{ 
                  width: { sm: `calc(100% - ${currentWidth}px)` },
                }}
              >
                <Routes>
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/" element={<Navigate to="/inventory" replace />} />
                </Routes>
              </Box>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </CartProvider>
    </NotificationProvider>
  );
};

export default App;
