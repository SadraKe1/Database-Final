const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true }, // Name of the course
    credits: { type: Number, required: true },    // Number of credits
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true } // Reference to Instructor
}, {
    collection: "courses" // Correct collection name
});

module.exports = mongoose.model('Course', courseSchema);