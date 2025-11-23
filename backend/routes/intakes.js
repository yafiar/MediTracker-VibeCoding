const express = require('express');
const router = express.Router();
const Intake = require('../models/Intake');
const auth = require('../middleware/auth');

// Get today's intakes
router.get('/today', auth, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const intakes = await Intake.find({
      userId: req.user._id,
      date: { $gte: startOfDay, $lte: endOfDay }
    })
      .populate('medicineId', 'name dosage type')
      .populate('scheduleId');

    res.json(intakes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Record intake
router.post('/', auth, async (req, res) => {
  try {
    const scheduleId = req.body.scheduleId || req.body.schedule;
    const medicineId = req.body.medicineId || req.body.medicine;
    const scheduledTime = req.body.scheduledTime || req.body.time;
    if (!scheduleId || !medicineId || !scheduledTime) {
      return res.status(400).json({ message: 'scheduleId/medicineId/time required' });
    }
    // Prevent duplicate intake for same schedule & date
    const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(); endOfDay.setHours(23,59,59,999);
    const existing = await Intake.findOne({
      userId: req.user._id,
      scheduleId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });
    if (existing) {
      return res.status(200).json(existing); // Already recorded
    }
    const intake = new Intake({
      userId: req.user._id,
      scheduleId,
      medicineId,
      scheduledTime,
      status: req.body.status || 'taken',
      notes: req.body.notes
    });
    await intake.save();
    await intake.populate('medicineId', 'name dosage type');
    res.status(201).json(intake);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get intake history
router.get('/history', auth, async (req, res) => {
  try {
    const intakes = await Intake.find({ userId: req.user._id })
      .populate('medicineId', 'name dosage type')
      .sort({ date: -1 })
      .limit(50);

    res.json(intakes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;