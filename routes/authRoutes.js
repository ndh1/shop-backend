const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. API Đăng ký tài khoản
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email này đã được đăng ký!' });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false
    });

    await newUser.save();
    res.status(201).json({ message: 'Đăng ký tài khoản thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server:', error: error.message });
  }
});

// 2. API Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email không tồn tại!' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Mật khẩu không đúng!' });

    // Tạo Token chứa ID và quyền Admin
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'BiMat123456',
      { expiresIn: '3d' }
    );

    res.json({
      message: 'Đăng nhập thành công!',
      token,
      user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server:', error: error.message });
  }
});

module.exports = router;