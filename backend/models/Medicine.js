const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: Number, // times per day
    default: 1
  },
  type: {
    type: String,
    enum: ['Tablet', 'Kapsul', 'Sirup', 'Salep', 'Lainnya'],
    default: 'Tablet'
  },
  description: {
    type: String
  },
  image: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Medicine', MedicineSchema);