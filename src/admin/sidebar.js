import React from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240; // Độ rộng của Sidebar

const AdminSidebar = ({ children }) => {
  const navigate = useNavigate(); // Hook để điều hướng khi nhấn vào các mục

  const handleNavigation = (path) => {
    navigate(path); // Điều hướng đến trang tương ứng
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Fashion Shop Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* Dashboard */}
            <ListItem button onClick={() => handleNavigation('/admin/dashboard')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            {/* Product Management */}
            <ListItem button onClick={() => handleNavigation('/admin/products')}>
              <ListItemIcon>
                <ShoppingBagIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý sản phẩm" />
            </ListItem>

            {/* Order Management */}
            <ListItem button onClick={() => handleNavigation('/admin/orders')}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý đơn hàng" />
            </ListItem>

            {/* User Management */}
            <ListItem button onClick={() => handleNavigation('/admin/users')}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý người dùng" />
            </ListItem>

            {/* Category Management */}
            <ListItem button onClick={() => handleNavigation('/admin/categories')}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý danh mục" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Nội dung chính */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          mt: '64px', // Khoảng cách cho Header
        }}
      >
        <Toolbar />
        {children} {/* Nơi hiển thị nội dung trang */}
      </Box>
    </Box>
  );
};

export default AdminSidebar;
