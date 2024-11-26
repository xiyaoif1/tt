import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const AdminHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null); // Để điều khiển Menu

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 240px)`, // Độ rộng tùy chỉnh cho khoảng cách với Sidebar
        ml: `240px`, // Khoảng cách trái phù hợp với Sidebar
      }}
    >
      <Toolbar>
        {/* Menu Icon (Có thể dùng cho giao diện responsive nếu cần mở/đóng sidebar) */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: 'none' } }} // Ẩn trên màn hình lớn
        >
          <MenuIcon />
        </IconButton>

        {/* Tiêu đề */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Fashion Shop Admin
        </Typography>

        {/* Nút Thông báo */}
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>

        {/* Nút Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenu}
            aria-controls="profile-menu"
            aria-haspopup="true"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
