import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import AdminLayout from './layoutadmin'; // Giả sử bạn đã tạo AdminLayout như hướng dẫn trước đó

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Tổng số người dùng */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}
            >
              <Typography variant="h6">Users</Typography>
              <Typography variant="h5">150</Typography> {/* Giá trị demo */}
            </Paper>
          </Grid>
          {/* Tổng số sản phẩm */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}
            >
              <Typography variant="h6">Products</Typography>
              <Typography variant="h5">300</Typography> {/* Giá trị demo */}
            </Paper>
          </Grid>
          {/* Tổng số đơn hàng */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}
            >
              <Typography variant="h6">Orders</Typography>
              <Typography variant="h5">45</Typography> {/* Giá trị demo */}
            </Paper>
          </Grid>
          {/* Tổng doanh thu */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}
            >
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h5">$12,000</Typography> {/* Giá trị demo */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
