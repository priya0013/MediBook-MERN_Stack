const express = require('express');
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({}).sort({ createdAt: -1 });
    return res.json(doctors);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to load doctors' });
  }
});

router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const {
      name,
      specializationId,
      specialization,
      qualifications,
      experience,
      consultationFee,
      duration,
      image,
      clinic,
      clinicAddress,
      clinicLat,
      clinicLng,
      available
    } = req.body;

    const latValue = Number(clinicLat);
    const lngValue = Number(clinicLng);

    if (!name || !specializationId || !specialization || !qualifications || !experience || !consultationFee || !duration || !clinic || !clinicAddress) {
      return res.status(400).json({ message: 'Missing doctor details' });
    }

    if (!Number.isFinite(latValue) || !Number.isFinite(lngValue)) {
      return res.status(400).json({ message: 'Invalid clinic coordinates' });
    }

    const doctor = await Doctor.create({
      name,
      specializationId,
      specialization,
      qualifications,
      experience,
      consultationFee,
      duration,
      image,
      clinic,
      clinicAddress,
      clinicLat: latValue,
      clinicLng: lngValue,
      available: available !== false
    });

    return res.status(201).json(doctor);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create doctor' });
  }
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    await doctor.deleteOne();
    return res.json({ message: 'Doctor deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete doctor' });
  }
});

module.exports = router;
