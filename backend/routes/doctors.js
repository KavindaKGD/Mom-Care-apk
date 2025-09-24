const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Add doctor
router.post('/', async (req, res) => {
  try {
    const doctorData = new Doctor(req.body);
    await doctorData.save();
    res.status(201).send({ message: 'Doctor data added successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error saving doctor data' });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).send(doctors);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching doctor data' });
  }
});

// Update rating
router.patch('/:id/rating', async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  try {
    const doctor = await Doctor.findByIdAndUpdate(id, { rating }, { new: true });
    if (!doctor) return res.status(404).send({ error: 'Doctor not found' });
    res.status(200).send({ message: 'Rating updated successfully', doctor });
  } catch (error) {
    res.status(500).send({ error: 'Error updating rating' });
  }
});

module.exports = router;
