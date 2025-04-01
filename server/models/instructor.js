const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  salary: { type: Number, required: true },
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Instructor', instructorSchema);
