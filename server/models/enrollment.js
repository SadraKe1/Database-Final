const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Reference to Student
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },   // Reference to Course
    enrollmentDate: { type: Date, default: Date.now }, // Date of enrollment
    grade: { type: String, enum: ['A', 'B', 'C', 'D', 'F', 'Incomplete'], default: 'Incomplete' } // Grade with validation
}, {
    collection: "enrollments" // Correct collection name
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
