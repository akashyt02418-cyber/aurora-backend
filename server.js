const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const productRoutes = require('./routes/productRoutes');

const app = express();

// CORS (abhi open rakha hai; baad me Netlify domain set kar dena)
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

// 🔥 MongoDB connect (ENV se)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    // Server start only after DB connects (better practice)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB Error:", err);
    process.exit(1);
  });