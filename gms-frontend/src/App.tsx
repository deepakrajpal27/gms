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
import Category from './pages/Category';
import Orders from './pages/Orders';
import Sidebar, { DRAWER_WIDTH, COLLAPSED_DRAWER_WIDTH } from './components/Sidebar';
import './styles/App.css';

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
  console.log(`Current sidebar width: ${currentWidth}px`);
  return (
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
              <Typography variant="h6" noWrap component="div">
                {title}
              </Typography>
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
              <Route path="/categories" element={<Category />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/" element={<Navigate to="/inventory" replace />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
