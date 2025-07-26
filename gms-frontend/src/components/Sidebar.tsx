import React, { useState } from 'react';
import { 
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 65;

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/inventory', label: 'Inventory', icon: <InventoryIcon /> },
];

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  onExpandChange?: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle, onExpandChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpandChange?.(newExpandedState);
  };

  const drawer = (
    <>
      <Toolbar className={isExpanded ? "sidebar-toolbar-flexEnd" : "sidebar-toolbar-center"}>
        <IconButton onClick={handleToggleExpand}>
          {isExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={() => isMobile && onDrawerToggle()}
            className={isExpanded ? "nav-item-expanded" : "nav-item-collapsed"}
          >
            <ListItemIcon 
              className={isExpanded ? "nav-item-icon-expanded" : "nav-item-icon-collapsed"}
            >
              {item.icon}
            </ListItemIcon>
            {isExpanded && (
              <ListItemText 
                primary={item.label} 
                className="nav-item-text"
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      className={`sidebar ${isExpanded ? '' : 'sidebar-drawer-collapsed'}`}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        className="sidebar-drawer"
        classes={{
          paper: isExpanded ? 'sidebar-drawer' : 'sidebar-drawer-collapsed'
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        className="sidebar-drawer"
        classes={{
          paper: isExpanded ? 'sidebar-drawer' : 'sidebar-drawer-collapsed'
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export { DRAWER_WIDTH, COLLAPSED_DRAWER_WIDTH };
export default Sidebar;
