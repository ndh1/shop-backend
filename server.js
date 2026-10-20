const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB đã kết nối thành công');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Backend server đang chạy tại port ${PORT}`));
  })
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));