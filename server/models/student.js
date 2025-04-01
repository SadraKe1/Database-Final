const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fee: { type: Number, required: true },
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
