const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Aurora E-commerce API is running...');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI || MONGO_URI.includes('YOUR_PASSWORD')) {
  console.error("❌ ERROR: MongoDB URI is missing or contains 'YOUR_PASSWORD' placeholder.");
  console.log("Please update your .env file with your actual MongoDB connection string.");
  // process.exit(1); // Don't exit yet so we can see the message
}

// 🔥 MongoDB connect
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Database Connection Error:", err.message);
    console.log("Tip: Check your IP Whitelist in MongoDB Atlas and ensure your password is correct.");
    
    // In dev mode, we might still want the server to start even if DB fails (fallback to mock data in routes)
    app.listen(PORT, () => {
        console.log(`🚀 Server started in FALLBACK mode on port ${PORT} (DB connection failed)`);
    });
  });