const express = require('express');
const router = require('express').Router();
const Product = require('../models/Product');

// Mock data as fallback
const mockProducts = [
    {
        _id: "1",
        name: "Lumina Desk Lamp",
        description: "Minimalist lighting solution with touch-sensitive controls and adjustable brightness.",
        price: 129,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000",
        category: "Living",
        featured: true
    },
    {
        _id: "2",
        name: "Zenith Wireless Headphones",
        description: "Studio-grade sound quality with active noise cancellation and 40-hour battery life.",
        price: 299,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
        category: "Tech",
        featured: true
    },
    {
        _id: "3",
        name: "Aura Ceramic Vase",
        description: "Handcrafted ceramic vase with a matte finish, perfect for modern interiors.",
        price: 75,
        image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000",
        category: "Decor",
        featured: true
    },
    {
        _id: "4",
        name: "Chronos Watch",
        description: "Timeless design meeting modern precision. Sapphire glass and Italian leather strap.",
        price: 450,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000",
        category: "Accessories",
        featured: true
    },
    {
        _id: "5",
        name: "Modu Armchair",
        description: "Sculptural armchair upholstered in premium wool blend. Comfort meets high-end aesthetics.",
        price: 850,
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000",
        category: "Living",
        featured: true
    },
    {
        _id: "6",
        name: "Sonic Soundbar",
        description: "Immersive audio experience for your living room. Sleek aluminum finish.",
        price: 599,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000",
        category: "Tech",
        featured: false
    },
    {
        _id: "7",
        name: "Ethereal Diffuser",
        description: "Ultrasonic aromatherapy diffuser with ambient lighting and natural wood base.",
        price: 45,
        image: "https://images.unsplash.com/photo-1602928294241-3337775797a7?q=80&w=1000",
        category: "Decor",
        featured: false
    },
    {
        _id: "8",
        name: "Titanium Pen",
        description: "Precision-engineered writing instrument. Balanced, durable, and sophisticated.",
        price: 89,
        image: "https://images.unsplash.com/photo-1585336261022-69c6e29ce33d?q=80&w=1000",
        category: "Accessories",
        featured: false
    }
];

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products.length > 0 ? products : mockProducts);
    } catch (err) {
        res.json(mockProducts);
    }
});

// Get featured products
router.get('/featured', async (req, res) => {
    try {
        const products = await Product.find({ featured: true });
        res.json(products.length > 0 ? products : mockProducts.filter(p => p.featured));
    } catch (err) {
        res.json(mockProducts.filter(p => p.featured));
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            const mock = mockProducts.find(p => p._id === req.params.id);
            if (mock) return res.json(mock);
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        const mock = mockProducts.find(p => p._id === req.params.id);
        if (mock) return res.json(mock);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
