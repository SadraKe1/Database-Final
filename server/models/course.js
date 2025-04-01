const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    credits: { type: Number, required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }, // Reference to Instructor model
    enrollmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }, // Reference to Enrollment model
});

module.exports = mongoose.model('Course', courseSchema);