const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        desc: req.body.desc,
        img: req.body.img,
        category: req.body.category
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Category routes
router.route('/category/:category')
    // Get products by category
    .get(async (req, res) => {
        try {
            const products = await Product.find({ category: req.params.category });
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    // Add new product to specific category
    .post(async (req, res) => {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            img: req.body.img,
            category: req.params.category
        });

        try {
            const newProduct = await product.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            Object.assign(product, req.body);
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;