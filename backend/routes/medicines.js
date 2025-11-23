const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all medicines
router.get('/', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single medicine
router.get('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ _id: req.params.id, userId: req.user._id });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create medicine (with image upload)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const medicineData = {
      userId: req.user._id,
      name: req.body.name,
      dosage: req.body.dosage,
      type: req.body.type,
      description: req.body.description,
      frequency: req.body.frequency || 1
    };

    if (req.file) {
      medicineData.image = `/uploads/${req.file.filename}`;
    }

    const medicine = new Medicine(medicineData);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update medicine
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      dosage: req.body.dosage,
      type: req.body.type,
      description: req.body.description,
      frequency: req.body.frequency || 1
    };

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete medicine
router.delete('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;