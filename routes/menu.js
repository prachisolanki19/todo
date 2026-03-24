const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find({ isAvailable: true });
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new menu item (Admin)
router.post('/', async (req, res) => {
    const menuItem = new Menu({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    });

    try {
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
