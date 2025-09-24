const express = require('express');
const mongoose = require('mongoose');
const Visit = require('../models/Visit');

const router = express.Router();

// Create a new visit
router.post('/', async (req, res) => {
  try {
    const visitData = new Visit(req.body);
    await visitData.save();
    res.status(201).send({ message: 'Visit added successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error saving visit data' });
  }
});

// Get all visits
router.get('/', async (req, res) => {
  try {
    const visits = await Visit.find();
    // Always return _id as a string
    const cleanVisits = visits.map(v => ({
      ...v.toObject(),
      _id: v._id.toString()
    }));
    res.status(200).send(cleanVisits);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching visit data' });
  }
});

// Get current month visits
router.get('/current-date', async (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');

  try {
    const visits = await Visit.find({
      selectedDate: { $regex: `^${year}-${month}` }
    });

    const cleanVisits = visits.map(v => ({
      ...v.toObject(),
      _id: v._id.toString()
    }));

    res.status(200).send(cleanVisits);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching current month visit data' });
  }
});

// Update notification
router.patch('/update-notification/:id', async (req, res) => {
  const { id } = req.params;
  const { Notification } = req.body;

  try {
    const visit = await Visit.findByIdAndUpdate(id, { Notification }, { new: true });
    if (!visit) return res.status(404).send({ error: 'Visit not found' });

    res.status(200).send({
      message: 'Notification updated successfully',
      visit: { ...visit.toObject(), _id: visit._id.toString() }
    });
  } catch (error) {
    res.status(500).send({ error: 'Error updating Notification' });
  }
});

// Delete visit
router.delete('/delete-visit/:id', async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) return res.status(404).send({ error: 'Visit not found' });

    res.status(200).send({
      message: 'Visit deleted successfully',
      deletedId: visit._id.toString()
    });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting visit' });
  }
});

module.exports = router;
