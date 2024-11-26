import React from 'react';
import ReactDOM from 'react-dom/client'; // Nhập thư viện ReactDOM để xử lý DOM
import { BrowserRouter } from 'react-router-dom'; // Nhập BrowserRouter để quản lý định tuyến
import App from './App'; // Nhập thành phần App, nơi quản lý tất cả các route của ứng dụng
import 'typeface-roboto'; // Nhập font Roboto

// Tạo root ứng dụng
const root = ReactDOM.createRoot(document.getElementById('root')); // Tìm phần tử với ID 'root' trong DOM

// Render ứng dụng của bạn
root.render(
  <BrowserRouter>
    <App /> {/* Render App để quản lý tất cả các route */}
  </BrowserRouter>
);
