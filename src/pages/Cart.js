import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        setSnackbarMessage("Vui lòng đăng nhập để xem giỏ hàng.");
        setOpenSnackbar(true);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:1234/api/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (err) {
        setError("Lỗi khi lấy giỏ hàng");
        console.error("Lỗi khi lấy giỏ hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:1234/api/cart/${userId}/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter(item => item.id !== itemId));
      setSnackbarMessage("Đã xóa sản phẩm khỏi giỏ hàng.");
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", err);
      setSnackbarMessage("Không thể xóa sản phẩm. Vui lòng thử lại.");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:1234/api/cart/${userId}/${itemId}`, { quantity: newQuantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
    } catch (err) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", err);
      setSnackbarMessage("Không thể cập nhật số lượng. Vui lòng thử lại.");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography align="center" color="error">{error}</Typography>;
  }

  if (cartItems.length === 0) {
    return <Typography align="center">Giỏ hàng của bạn trống.</Typography>;
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Giỏ hàng của bạn
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map(item => (
          <Grid item xs={12} key={item.id}>
            <Box sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
              <img src={item.imageUrl} alt={item.name} width={100} height={100} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">Giá: {item.price} VND</Typography>
                <Typography variant="body2">Số lượng:</Typography>
                <Button variant="outlined" onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
                <Typography variant="body2" sx={{ display: 'inline-block', mx: 2 }}>{item.quantity}</Typography>
                <Button variant="outlined" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                <IconButton onClick={() => handleRemoveItem(item.id)} color="error" sx={{ ml: 2 }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Tổng giá: {totalPrice} VND
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Thanh toán</Button>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
