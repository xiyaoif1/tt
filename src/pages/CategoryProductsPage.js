import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryProductsPage = () => {
    const { categoryId } = useParams(); // Lấy categoryId từ URL
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:1234/api/categories/${categoryId}/products`);
                setProducts(response.data); // Lưu sản phẩm vào state
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };

        fetchProducts();
    }, [categoryId]); // Gọi lại API mỗi khi categoryId thay đổi

    return (
        <Container style={{ paddingBottom: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Sản phẩm thuộc danh mục
            </Typography>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.product_id}>
                        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography variant="body2">{product.description}</Typography>
                            <Typography variant="body1">${product.price}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CategoryProductsPage;
