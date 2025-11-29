require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { startDailyCleanup } = require('./services/dailyCleanup');

const app = express();

// Middleware
// Allow all origins for production deployment (MongoDB Atlas already secured with auth)
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    // Start daily cleanup scheduler after DB connection
    startDailyCleanup();
  })
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const medicineRoutes = require('./routes/medicines');
const scheduleRoutes = require('./routes/schedules');
const intakeRoutes = require('./routes/intakes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/intakes', intakeRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'MediTracker API is running!',
    status: 'success',
    timestamp: new Date()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads folder: ${path.join(__dirname, 'uploads')}`);
});