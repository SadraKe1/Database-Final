const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    salary: { type: Number, required: true }, // Instructor-specific field
    personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true } // Reference to Person
}, {
    collection: "instructors" // Correct collection name
});

module.exports = mongoose.model('Instructor', instructorSchema);