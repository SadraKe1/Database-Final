const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  credits: { type: Number, required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
