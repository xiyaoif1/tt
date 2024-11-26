import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Banner from './Banner';

const Layout = ({ children }) => {
  return (
    <Box>
      {/* Hiển thị Header */}
      <Header />

      {/* Banner: chỉ hiển thị trên một số trang */}
      <Box sx={{ marginTop: '64px' }}>
        {/* Kiểm tra điều kiện hiển thị Banner */}
        {['/', '/about', '/products'].includes(window.location.pathname) && <Banner />}
      </Box>

      {/* Nội dung chính (Các trang con) */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Grid container spacing={3} sx={{ width: '100%', maxWidth: 1200 }}>
          <Grid item xs={12}>
            {children} {/* Các trang con */}
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
