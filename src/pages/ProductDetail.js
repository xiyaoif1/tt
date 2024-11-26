import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Grid,
  Box,
  CircularProgress,
  IconButton,
  ButtonGroup,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:1234/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Lỗi khi lấy sản phẩm");
        console.error("Lỗi khi lấy sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');  // Lấy token từ localStorage

    if (!userId) {
      setSnackbarMessage("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      setOpenSnackbar(true);
      return;
    }
    if (!selectedSize || !selectedColor) {
      setSnackbarMessage("Vui lòng chọn kích thước và màu sắc.");
      setOpenSnackbar(true);
      return;
    }
    
    try {
      const headers = {
        Authorization: `Bearer ${token}`,  // Gửi token trong header
      };

      const response = await axios.post(
        "http://localhost:1234/api/cart/add", 
        {
          user_id: userId,
          product_id: product.product_id,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor,
        },
        { headers }  // Gửi headers khi gửi yêu cầu API
      );

      if (response.status === 200) {
        setSnackbarMessage(`Đã thêm ${quantity} sản phẩm ${product.name} vào giỏ hàng.`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        navigate('/cart');  // Điều hướng đến trang giỏ hàng
      }
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
      setSnackbarMessage("Không thể thêm vào giỏ hàng. Vui lòng thử lại.");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" align="center" color="error">
        {error}
      </Typography>
    );
  }

  if (!product) {
    return (
      <Typography variant="body1" align="center">
        Không tìm thấy sản phẩm
      </Typography>
    );
  }

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);

  const sizes = product.size ? product.size.split(",").map((s) => s.trim()) : [];
  const colors = product.color ? product.color.split(",").map((c) => c.trim()) : [];

  return (
    <Container sx={{ mt: 10 }}>
      <form>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: '2rem' }}>
              {product.name}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: "red", fontSize: "1.5rem" }}>
              Giá: {formattedPrice}
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: "1rem" }}>
              Mô tả: {product.description}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              Thương hiệu: {product.brand}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              Đánh giá: {product.rating}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              Tình trạng hàng: {product.stock_status}
            </Typography>

            <div>
              <Typography variant="body2" sx={{ fontSize: "1rem", mt: 2 }}>
                Kích thước:
              </Typography>
              <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ mt: 1 }}>
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    onClick={() => setSelectedSize(size)}
                    sx={{ fontSize: "1rem" }}
                  >
                    {size}
                  </Button>
                ))}
              </ButtonGroup>
            </div>

            <div>
              <Typography variant="body2" sx={{ fontSize: "1rem", mt: 2 }}>
                Màu sắc:
              </Typography>
              <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ mt: 1 }}>
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "contained" : "outlined"}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      backgroundColor: selectedColor === color ? color : "transparent",
                      color: selectedColor === color ? "white" : "black",
                      "&:hover": {
                        opacity: 0.8,
                      },
                    }}
                  >
                    {color}
                  </Button>
                ))}
              </ButtonGroup>
            </div>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{ borderRadius: '5px', borderColor: 'black', color: 'black' }}
                >
                  -
                </Button>
                <Typography variant="body1" sx={{ minWidth: 40, textAlign: 'center', mx: 1 }}>
                  {quantity}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{ borderRadius: '5px', borderColor: 'black', color: 'black' }}
                >
                  +
                </Button>
              </Box>

              <ButtonGroup variant="contained" sx={{ borderRadius: '5px', backgroundColor: 'black' }}>
                <IconButton
                  onClick={handleAddToCart}
                  sx={{ color: 'white' }}
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{ color: 'white', px: 2 }}
                >
                  Thêm vào giỏ hàng
                </Typography>
              </ButtonGroup>
            </Box>

            <Snackbar 
              open={openSnackbar} 
              autoHideDuration={3000} 
              onClose={() => setOpenSnackbar(false)}>
              <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProductDetail;
