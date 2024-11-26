import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import AdminHeader from './AdminHeader'; // Giả sử file này có header đã viết sẵn
import AdminSidebar from './Sidebar'; // Giả sử file này có sidebar đã viết sẵn

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Layout */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`, // Khoảng cách phù hợp với sidebar
          mt: '64px', // Khoảng cách cho Header
        }}
      >
        <AdminHeader />
        {children} {/* Nội dung trang */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
