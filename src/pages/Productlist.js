// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link để điều hướng
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State để lưu danh mục
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('low-high');

  useEffect(() => {
    // Lấy danh sách sản phẩm
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1234/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    // Lấy danh sách danh mục
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:1234/api/categories');
        setCategories(response.data); // Lưu danh mục vào state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories(); // Lấy danh mục
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (loading) return <Typography variant="h6">Loading...</Typography>;

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-high') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Product List
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={handleCategoryChange} label="Category">
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.category_id} value={category.name}>
                  {category.name} {/* Hiển thị tên danh mục từ cơ sở dữ liệu */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Sort</InputLabel>
            <Select value={sortOrder} onChange={handleSortChange} label="Sort">
              <MenuItem value="low-high">Low to High</MenuItem>
              <MenuItem value="high-low">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={2}>
          {sortedProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id || index}>
              <Card>
                <Link to={`/products/${product.product_id}`}> {/* Điều hướng đến trang chi tiết sản phẩm */}
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image}
                    alt={product.name}
                  />
                </Link>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description.length > 150
                      ? `${product.description.slice(0, 150)}...`
                      : product.description}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'red', mt: 1 }}>
                    {formatPrice(product.price)}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 1,
                      backgroundColor: '#000', // Màu đen cho nút
                      '&:hover': { backgroundColor: '#333' } // Màu khi hover
                    }}
                    startIcon={<ShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductList;
