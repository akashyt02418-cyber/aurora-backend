const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/awwwards-shop')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
