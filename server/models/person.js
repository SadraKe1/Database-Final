const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Person's name
    address: String // Person's address
}, {
    collection: "people" // Correct collection name
});

module.exports = mongoose.model('Person', personSchema);