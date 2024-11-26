import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

// Import ảnh từ thư mục assets
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';

// Mảng chứa các đường dẫn ảnh sẽ được hiển thị trong banner
const images = [image1, image2, image3];

const DynamicBanner = () => {
  // State để lưu chỉ số của ảnh hiện tại
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sử dụng useEffect để cài đặt interval thay đổi ảnh sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      // Cập nhật chỉ số ảnh hiện tại, quay về 0 khi đến ảnh cuối
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Thời gian chuyển đổi ảnh là 5000ms (5 giây)

    // Dọn dẹp interval khi component bị hủy để tránh rò rỉ bộ nhớ
    return () => clearInterval(interval);
  }, []); // Mảng phụ thuộc rỗng để chỉ chạy khi component được mount

  return (
    <Box
      sx={{
        position: 'relative', // Đặt position relative để các ảnh chồng lên nhau
        height: '500px', // Chiều cao của banner
        overflow: 'hidden', // Giới hạn các phần thừa của ảnh không hiển thị ngoài khung
        width: '100vw', // Chiều rộng toàn màn hình
        marginX: 'calc(-50vw + 50%)', // Kéo rộng ảnh sát hai bên màn hình
      }}
    >
      {/* Duyệt qua mảng images và hiển thị từng ảnh */}
      {images.map((image, index) => (
        <motion.img
          key={index} // Khóa duy nhất cho mỗi ảnh
          src={image} // Đường dẫn ảnh
          alt={`Banner ${index + 1}`} // Văn bản thay thế cho mỗi ảnh
          style={{
            position: 'absolute', // Đặt ảnh chồng lên nhau
            width: '100vw', // Đảm bảo ảnh rộng toàn màn hình
            height: '100%', // Chiều cao của ảnh khớp với container
            objectFit: 'cover', // Giữ nguyên tỷ lệ ảnh và cắt để khớp với khung
            opacity: currentImageIndex === index ? 1 : 0, // Ảnh hiện tại hiển thị, ảnh khác bị ẩn
            transition: 'opacity 1s ease-in-out', // Hiệu ứng mờ dần khi chuyển ảnh
          }}
        />
      ))}
    </Box>
  );
};

export default DynamicBanner;
