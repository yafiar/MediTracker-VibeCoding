const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    default: 'Reminder'
  },
  body: {
    type: String,
    required: true
  },
  medicine: {
    type: Object,
    default: null
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    default: null
  },
  scheduledTime: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
    // Auto-delete notifications older than 7 days
    expires: 7 * 24 * 60 * 60 // 7 days in seconds
  }
});

// Index for efficient queries
notificationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
