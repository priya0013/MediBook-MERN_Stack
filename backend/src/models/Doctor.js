const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  specializationId: { type: Number, required: true },
  specialization: { type: String, required: true },
  qualifications: { type: String, required: true },
  experience: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  duration: { type: Number, required: true },
  image: { type: String, default: '👨‍⚕️' },
  clinic: { type: String, required: true },
  clinicAddress: { type: String, required: true },
  clinicLat: { type: Number, required: true },
  clinicLng: { type: Number, required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
