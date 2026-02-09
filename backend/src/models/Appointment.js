const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: String },
  doctorName: { type: String, required: true },
  specialization: { type: String, required: true },
  clinic: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'Confirmed' },
  bookedAt: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
