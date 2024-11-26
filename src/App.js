import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'; 
import { CssBaseline, Container } from '@mui/material';
import Layout from './components/Layout'; // Layout cho người dùng thông thường
import AdminLayout from './admin/layoutadmin'; // Layout dành cho admin
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/Contact';
import AdminDashboard from './admin/AdminDashboard'; // Trang admin mẫu
import AdminUsers from './admin/AdminUsers'; // Trang admin mẫu khác
import ProductManagementPage from './admin/ProductManagementPage'; // Import trang quản lý sản phẩm
import CategoryProductsPage from './pages/CategoryProductsPage'; // Import trang CategoryProductsPage

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin'); // Kiểm tra nếu route là admin

  return (
    <>
      <CssBaseline /> {/* Đặt lại các style mặc định */}
      
      {isAdminRoute ? (
        <AdminLayout> {/* Layout cho các route admin */}
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/products" element={<ProductManagementPage />} /> {/* Thêm route cho trang quản lý sản phẩm */}
            {/* Thêm các route khác dành cho admin nếu cần */}
          </Routes>
        </AdminLayout>
      ) : (
        <Layout> {/* Layout cho người dùng không phải admin */}
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/category/:categoryId" element={<CategoryProductsPage />} /> {/* Route cho CategoryProductsPage */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Container>
        </Layout>
      )}
    </>
  );
}

export default App;
