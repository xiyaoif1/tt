import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  Box,
  IconButton,
  styled,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

// Styled component cho InputBase để tùy chỉnh giao diện ô tìm kiếm
const Search = styled("div")(({ theme, visible }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#575757",
  overflow: "hidden",
  width: visible ? "200px" : "0",
  transition: "width 0.3s ease",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: visible ? "200px" : "0",
  },
}));

// Wrapper cho biểu tượng tìm kiếm
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ccc",
}));

// Tùy chỉnh giao diện cho InputBase của ô tìm kiếm
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    backgroundColor: "#575757",
  },
}));

// Thành phần Header
const Header = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  // Hàm xử lý khi bấm vào nút tìm kiếm
  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: "rgba(51, 51, 51, 0.9)" }}>
      <Toolbar>
        {/* Logo CASUAL với font nghệ thuật */}
        <Box
          component="span"
          sx={{
            fontFamily: "'Crimson Text', serif",
            fontSize: "1.5rem",
            color: "white",
            flexGrow: 1,
          }}
        >
          CASUAL
        </Box>

        {/* Menu điều hướng */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Products</Button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">About</Button>
          </Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Cart</Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Contact</Button>
          </Link>
        </Box>

        {/* Nút hiển thị ô tìm kiếm */}
        <IconButton
          onClick={handleSearchClick}
          color="inherit"
          aria-label="toggle search"
          aria-expanded={searchVisible}
          sx={{ ml: 1 }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>

        {/* Ô tìm kiếm */}
        <Search visible={searchVisible}>
          <SearchIconWrapper>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Nút đăng nhập */}
        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button color="inherit">Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
