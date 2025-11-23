require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads folder if not exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/medicines', require('./routes/medicines'));
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/intakes', require('./routes/intakes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Medicine Tracker API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});