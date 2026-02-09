const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .sort({ date: 1, time: 1 });
    return res.json(appointments);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to load appointments' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const {
      doctorId,
      doctorName,
      specialization,
      clinic,
      date,
      time,
      consultationFee,
      reason
    } = req.body;

    if (!doctorName || !specialization || !clinic || !date || !time || !consultationFee || !reason) {
      return res.status(400).json({ message: 'Missing appointment details' });
    }

    const appointment = await Appointment.create({
      userId: req.user.id,
      doctorId,
      doctorName,
      specialization,
      clinic,
      date,
      time,
      consultationFee,
      reason,
      status: 'Confirmed',
      bookedAt: new Date().toISOString().split('T')[0]
    });

    return res.status(201).json(appointment);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create appointment' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, userId: req.user.id });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'Cancelled';
    await appointment.save();

    return res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to cancel appointment' });
  }
});

module.exports = router;
