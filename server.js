const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());
// Cho phép Backend nhận dữ liệu JSON / Base64 dung lượng lớn (tối đa 100MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/products', productRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB đã kết nối thành công');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Backend server đang chạy tại port ${PORT}`));
  })
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Khai báo đường dẫn authRoutes
const authRoutes = require('./routes/authRoutes');

// Thêm route API Auth bên dưới các middleware express.json
app.use('/api/auth', authRoutes);