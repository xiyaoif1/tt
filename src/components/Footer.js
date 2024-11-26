import React from "react";
import { Box, Typography, Link, Stack, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#333",
        color: "white",
        py: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      {/* Nội dung bản quyền */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </Typography>

      {/* Các liên kết điều hướng trong footer */}
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 1 }}>
        <Link href="#about" color="inherit" underline="hover">
          About Us
        </Link>
        <span>|</span>
        <Link href="#privacy" color="inherit" underline="hover">
          Privacy Policy
        </Link>
      </Stack>

      {/* Các liên kết mạng xã hội với biểu tượng */}
      <Typography variant="body2" sx={{ mb: 1 }}>
        Follow us on:
      </Typography>
      <Stack direction="row" spacing={1} justifyContent="center">
        <IconButton href="https://facebook.com" color="inherit" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </IconButton>
        <IconButton href="https://twitter.com" color="inherit" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </IconButton>
        <IconButton href="https://instagram.com" color="inherit" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
