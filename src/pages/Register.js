import React, { useState } from 'react'; 
import axios from 'axios'; 
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material'; 
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import { Link } from 'react-router-dom'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setError(null); 
    setSuccess(null); 

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:1234/api/users/register', {
        name,
        email,
        password,
      });
      setSuccess(response.data.message);
      setOpenSnackbar(true);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi!');
      setOpenSnackbar(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10, mb: 10 }}>
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Đăng Ký
        </Typography>
        <form onSubmit={handleRegister}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Họ Tên"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
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
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Xác Nhận Mật Khẩu"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            {success && (
              <Grid item xs={12}>
                <Typography color="primary">{success}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: 'black',
                  color: 'white',
                }}
              >
                Đăng Ký
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="body2">
                Đã có tài khoản?{' '}
                <Link to="/login" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                  Đăng Nhập
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar để hiển thị thông báo lỗi hoặc thành công */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={error ? 'error' : 'success'}
          variant="filled"
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
