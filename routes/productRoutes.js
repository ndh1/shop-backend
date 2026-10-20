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

module.exports = router;