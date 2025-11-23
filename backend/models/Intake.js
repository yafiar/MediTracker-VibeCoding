const mongoose = require('mongoose');

const IntakeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true
  },
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  scheduledTime: {
    type: String,
    required: true
  },
  takenAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['taken', 'missed', 'skipped'],
    default: 'taken'
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Intake', IntakeSchema);