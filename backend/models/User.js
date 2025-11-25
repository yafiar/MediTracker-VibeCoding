const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const pepper = process.env.JWT_SECRET || '';
  this.password = await bcrypt.hash(pepper + this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function(password) {
  const pepper = process.env.JWT_SECRET || '';
  const pepperedMatch = await bcrypt.compare(pepper + password, this.password);
  if (pepperedMatch) return true;
  // Fallback for legacy hashes without pepper (can be removed after migration)
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);