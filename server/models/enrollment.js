const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  EnrollmentID: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() }, // Unique ID for enrollment
  StudentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Reference to Student
  CourseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to Course
  EnrollmentDate: { type: Date, required: true }, // Date of enrollment
  Grade: { type: String, required: false }, // Optional grade field
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);