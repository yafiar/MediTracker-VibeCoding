const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const auth = require('../middleware/auth');

// Get all schedules
router.get('/', auth, async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.user._id })
      .populate('medicineId', 'name dosage type')
      .sort({ createdAt: -1 });
    // Add normalized fields for frontend compatibility
    res.json(schedules.map(s => ({
      ...s.toObject(),
      time: s.times && s.times.length ? s.times[0] : null
    })));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get schedules by medicine (frontend expects /schedules/medicine/:medicineId)
router.get('/medicine/:medicineId', auth, async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.user._id, medicineId: req.params.medicineId })
      .populate('medicineId', 'name dosage type')
      .sort({ createdAt: -1 });
    res.json(schedules.map(s => ({
      ...s.toObject(),
      time: s.times && s.times.length ? s.times[0] : null
    })));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create schedule
router.post('/', auth, async (req, res) => {
  try {
    // Accept both legacy (medicineId, times[]) and frontend (medicine, time, days[])
    const medicineId = req.body.medicineId || req.body.medicine;
    const times = req.body.times || (req.body.time ? [req.body.time] : []);
    if (!medicineId || !times.length) {
      return res.status(400).json({ message: 'medicine/time required' });
    }
    const schedule = new Schedule({
      userId: req.user._id,
      medicineId,
      times,
      days: req.body.days || [],
      frequency: req.body.frequency || 'daily',
      startDate: req.body.startDate || Date.now(),
      endDate: req.body.endDate
    });

    await schedule.save();
    await schedule.populate('medicineId', 'name dosage type');
    res.status(201).json({
      ...schedule.toObject(),
      time: schedule.times[0]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update schedule
router.put('/:id', auth, async (req, res) => {
  try {
    const schedule = await Schedule.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    ).populate('medicineId', 'name dosage type');

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.json({
      ...schedule.toObject(),
      time: schedule.times && schedule.times.length ? schedule.times[0] : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete schedule
router.delete('/:id', auth, async (req, res) => {
  try {
    const schedule = await Schedule.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;