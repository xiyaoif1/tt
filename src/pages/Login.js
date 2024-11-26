import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:1234/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('role', user.role);
      localStorage.setItem('name', user.name);

      setSuccess('Đăng nhập thành công! Chào mừng bạn quay lại.');
      setOpenSnackbar(true);

      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'customer') {
          navigate('/');
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi! Vui lòng thử lại.');
      setOpenSnackbar(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} style={{ padding: '32px', marginBottom: '32px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Đăng Nhập
        </Typography>
        <form onSubmit={handleLogin} style={{ marginTop: '16px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mật Khẩu"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ marginTop: '16px', backgroundColor: 'black', color: 'white' }}
              >
                Đăng Nhập
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="body2">
                Chưa có tài khoản?{' '}
                <Link to="/register" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                  Đăng Ký
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {/* Snackbar hiển thị thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000} // Thời gian hiển thị
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Hiển thị ở góc dưới bên trái
      >
        {error ? (
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            variant="filled"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '& .MuiAlert-icon': {
                color: '#f44336', // Màu đỏ cho icon
              },
            }}
          >
            {error}
          </Alert>
        ) : (
          success && (
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              variant="filled"
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '& .MuiAlert-icon': {
                  color: '#4caf50', // Màu xanh lá cho icon
                },
              }}
            >
              {success}
            </Alert>
          )
        )}
      </Snackbar>

    </Container>
  );
};

export default Login;
