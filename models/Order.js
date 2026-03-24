const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    tableNumber: { type: String },
    paymentMethod: { type: String, enum: ['UPI', 'Cash'], default: 'UPI' },
    status: { type: String, enum: ['Received', 'Preparing', 'Served', 'Completed'], default: 'Received' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
