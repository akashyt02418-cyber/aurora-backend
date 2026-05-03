const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
    {
        name: "Lumina Desk Lamp",
        description: "Minimalist lighting solution with touch-sensitive controls and adjustable brightness.",
        price: 129,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000",
        category: "Living",
        featured: true
    },
    {
        name: "Zenith Wireless Headphones",
        description: "Studio-grade sound quality with active noise cancellation and 40-hour battery life.",
        price: 299,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
        category: "Tech",
        featured: true
    },
    {
        name: "Aura Ceramic Vase",
        description: "Handcrafted ceramic vase with a matte finish, perfect for modern interiors.",
        price: 75,
        image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000",
        category: "Decor",
        featured: true
    },
    {
        name: "Chronos Watch",
        description: "Timeless design meeting modern precision. Sapphire glass and Italian leather strap.",
        price: 450,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000",
        category: "Accessories",
        featured: true
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/awwwards-shop')
    .then(async () => {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Database Seeded');
        process.exit();
    })
    .catch(err => console.log(err));
