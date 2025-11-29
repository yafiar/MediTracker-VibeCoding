const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// Get all notifications for the current user
router.get('/', auth, async (req, res) => {
  try {
    const limit = Math.min(200, parseInt(req.query.limit) || 200);
    
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(limit);
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new notification
router.post('/', auth, async (req, res) => {
  try {
    const notificationData = {
      userId: req.user._id,
      title: req.body.title || 'Reminder',
      body: req.body.body,
      medicine: req.body.medicine || null,
      scheduleId: req.body.scheduleId || null,
      scheduledTime: req.body.scheduledTime || null
    };

    const notification = new Notification(notificationData);
    await notification.save();
    
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear all notifications for the current user
router.delete('/clear', auth, async (req, res) => {
  try {
    await Notification.deleteMany({ userId: req.user._id });
    res.json({ message: 'All notifications cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
