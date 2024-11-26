import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:1234/api/categories');
                if (response.data && response.data.length > 0) {
                    setCategories(response.data);
                } else {
                    setError("Không có danh mục nào.");
                }
            } catch (error) {
                setError('Lỗi khi lấy dữ liệu danh mục.');
                console.error('Lỗi khi lấy dữ liệu danh mục:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container style={{ paddingBottom: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Bộ sưu tập CASUAL
            </Typography>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category.category_id}>
                        <Paper
                            elevation={3}
                            style={{
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundImage: `url(${category.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '200px',
                                color: 'white',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Typography variant="h6">{category.name}</Typography>
                            <Typography variant="body2">{category.description}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
