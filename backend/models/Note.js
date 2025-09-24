const mongoose = require('mongoose');

const healthTipSchema = new mongoose.Schema({
  doctorName: String,
  healthTips: String,
});

module.exports = mongoose.model('Note', healthTipSchema);
