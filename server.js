require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Gatti Chutney API is running.');
});

// MongoDB connection
if (process.env.MONGO_URI && process.env.MONGO_URI !== 'your_mongodb_connection_string_here') {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log(' Connected to MongoDB'))
      .catch(err => console.error(' MongoDB connection error:', err));
} else {
    console.log(' No valid MONGO_URI provided. Running without database connection.');
}

// Export app for Vercel
module.exports = app;

// Always listen locally (for testing)
const PORT = process.env.PORT || 5000;
if (process.env.VERCEL === undefined) {
    app.listen(PORT, () => {
        console.log(` Server running locally on port ${PORT}`);
    });
}