const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get medicines (with pagination, search, sorting)
router.get('/', auth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 12);
    const search = (req.query.search || '').trim();
    const sortFieldRaw = req.query.sortField === 'name' ? 'name' : 'createdAt';
    const sortDirectionRaw = req.query.sortDirection === 'asc' ? 1 : -1;

    const filter = { userId: req.user._id };
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const total = await Medicine.countDocuments(filter);
    const pages = Math.max(1, Math.ceil(total / limit));
    const skip = (page - 1) * limit;

    const items = await Medicine.find(filter)
      .sort({ [sortFieldRaw]: sortDirectionRaw })
      .skip(skip)
      .limit(limit);

    res.json({ items, total, page, pages, limit, sortField: sortFieldRaw, sortDirection: sortDirectionRaw });
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
      // File is now in uploads/userId/filename
      const userId = req.user._id.toString();
      medicineData.image = `/uploads/${userId}/${req.file.filename}`;
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
    const existing = await Medicine.findOne({ _id: req.params.id, userId: req.user._id });
    if (!existing) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    const updates = {
      name: req.body.name,
      dosage: req.body.dosage,
      type: req.body.type,
      description: req.body.description,
      frequency: req.body.frequency || 1
    };

    const removeImageFlag = req.body.removeImage === 'true' || req.body.removeImage === true;

    if (removeImageFlag && existing.image) {
      const oldPath = path.join(__dirname, '..', existing.image.replace(/^\//, ''));
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch (_) {}
      }
      updates.image = null;
    }

    if (req.file) {
      if (existing.image) {
        const oldPath = path.join(__dirname, '..', existing.image.replace(/^\//, ''));
        if (fs.existsSync(oldPath)) {
          try { fs.unlinkSync(oldPath); } catch (_) {}
        }
      }
      // File is now in uploads/userId/filename
      const userId = req.user._id.toString();
      updates.image = `/uploads/${userId}/${req.file.filename}`;
    }

    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true }
    );

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

    if (medicine.image) {
      const imgPath = path.join(__dirname, '..', medicine.image.replace(/^\//, ''));
      if (fs.existsSync(imgPath)) {
        try { fs.unlinkSync(imgPath); } catch (_) {}
      }
    }

    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;