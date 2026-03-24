const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, enum: ['Breakfast', 'Meals', 'Beverages'], required: true },
    imageUrl: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Menu', menuSchema);
