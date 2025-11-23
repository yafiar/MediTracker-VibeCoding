const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  // Support multiple intake times per day. Frontend currently sends single 'time'.
  times: [{
    type: String,
    required: true
  }],
  // Optional list of days (e.g. ['Monday','Wednesday']). Empty => daily.
  days: [{
    type: String
  }],
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'custom'],
    default: 'daily'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);