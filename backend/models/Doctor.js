const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  experience: String,
  qualifications: String,
  rating: Number,
  comments: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);
