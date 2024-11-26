// src/pages/ProductManagementPage.js
import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch sản phẩm từ backend
  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('There was an error fetching the products:', error));
  }, []);

  const handleOpenModal = (product = null) => {
    setEditProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditProduct(null);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(error => console.error('There was an error deleting the product:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const productData = new FormData(event.target);

    const product = {
      name: productData.get('name'),
      description: productData.get('description'),
      price: parseFloat(productData.get('price')),
      image: productData.get('image'),
    };

    if (editProduct) {
      // Cập nhật sản phẩm
      axios.put(`/api/products/${editProduct._id}`, product)
        .then(() => {
          setProducts(products.map(p => (p._id === editProduct._id ? { ...p, ...product } : p)));
          handleCloseModal();
        })
        .catch(error => console.error('There was an error updating the product:', error));
    } else {
      // Thêm mới sản phẩm
      axios.post('/api/products', product)
        .then(response => {
          setProducts([...products, response.data]);
          handleCloseModal();
        })
        .catch(error => console.error('There was an error creating the product:', error));
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Thêm Sản Phẩm
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(product._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Thêm/Sửa Sản Phẩm */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: 4, width: 400, borderRadius: 2
        }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Tên Sản Phẩm"
              name="name"
              defaultValue={editProduct ? editProduct.name : ''}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Mô Tả"
              name="description"
              defaultValue={editProduct ? editProduct.description : ''}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Giá"
              name="price"
              type="number"
              defaultValue={editProduct ? editProduct.price : ''}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Hình Ảnh"
              name="image"
              defaultValue={editProduct ? editProduct.image : ''}
              required
              sx={{ marginBottom: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="submit" variant="contained" color="primary">
                {editProduct ? 'Cập Nhật' : 'Thêm'}
              </Button>
              <Button onClick={handleCloseModal} variant="outlined" color="secondary">
                Đóng
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductManagementPage;
