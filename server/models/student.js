const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fee: { type: Number, required: true }, // Student-specific field
    personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true } // Reference to Person
}, {
    collection: "students" // Correct collection name
});

module.exports = mongoose.model('Student', studentSchema);