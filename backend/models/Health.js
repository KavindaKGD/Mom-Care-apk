const mongoose = require('mongoose');

const HealthMonitoringSchema = new mongoose.Schema({
  motherName: { type: String, required: true, trim: true },
  babyHeight: { type: Number, required: true, min: 0 },
  babyWeight: { type: Number, required: true, min: 0 },
  ageDays: { type: Number, required: true, min: 0 },
  meanWeight: { type: Number, required: true, min: 0 },
  healthStatus: {
    type: String,
    required: true,
    enum: ['Good', 'Needs Attention'],
  },
  calculatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Health', HealthMonitoringSchema);
