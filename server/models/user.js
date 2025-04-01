const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
});

// Add the passport-local-mongoose plugin to the schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);