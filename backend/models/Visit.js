const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  doctorName: String,
  clinicName: String,
  time: String,
  selectedDate: String,
  Notification: String,
});

module.exports = mongoose.model('Visit', visitSchema);
