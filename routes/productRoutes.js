const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Lấy danh sách tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm sản phẩm mới
router.post('/', async (req, res) => {
  const { name, price, image, description } = req.body;
  try {
    const newProduct = new Product({ name, price, image, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

 // API Xóa sản phẩm theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json({ message: 'Đã xóa sản phẩm thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server:', error: error.message });
  }
});

// API Cập nhật (Sửa) sản phẩm theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Trả về dữ liệu mới sau khi đã cập nhật
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server:', error: error.message });
  }
});

module.exports = router;

