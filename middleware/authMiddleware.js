const jwt = require('jsonwebtoken');

// Middleware xác thực Token người dùng
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'BiMat123456', (err, user) => {
      if (err) return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
  }
};

// Middleware kiểm tra quyền Admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: 'Chỉ Admin mới có quyền thực hiện thao tác này!' });
    }
  });
};

module.exports = { verifyToken, verifyAdmin };