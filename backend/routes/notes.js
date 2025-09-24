const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Add note
router.post('/', async (req, res) => {
  try {
    const noteData = new Note(req.body);
    await noteData.save();
    res.status(201).send({ message: 'Note added successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error saving Note data' });
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching notes' });
  }
});

module.exports = router;
