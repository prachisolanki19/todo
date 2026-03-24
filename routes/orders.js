const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place a new order
router.post('/', async (req, res) => {
    const order = new Order({
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        tableNumber: req.body.tableNumber,
        paymentMethod: req.body.paymentMethod
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all orders (Admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update order status (Admin)
router.patch('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (req.body.status) {
            order.status = req.body.status;
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
