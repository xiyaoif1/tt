import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Fetch users data from API
  useEffect(() => {
    axios.get('/api/users') // API endpoint để lấy danh sách người dùng
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users data!', error);
      });
  }, []);

  // Chuyển hướng đến trang chi tiết người dùng
  const handleViewUser = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  // Xóa người dùng (Giả sử bạn đã có API xóa người dùng)
  const handleDeleteUser = (userId) => {
    axios.delete(`/api/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý người dùng
      </Typography>

      {/* Table to display the list of users */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user list">
          <TableHead>
            <TableRow>
              <TableCell>Tên người dùng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewUser(user.id)}
                    sx={{ marginRight: 1 }}
                  >
                    Xem
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUsers;
