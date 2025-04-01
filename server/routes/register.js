const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// Render the registration page
router.get('/register', (req, res) => {
  res.render('auth/register', { 
    title: 'Register', 
    message: req.flash('error') || '' // Pass any error messages
  });
});

// Handle registration form submission
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Register the user using passport-local-mongoose
    const newUser = new User({ username });
    await User.register(newUser, password); // Automatically hashes and salts the password

    console.log('User registered successfully:', username);

    // Redirect to the login page after successful registration
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    req.flash('error', error.message || 'Registration failed.');
    res.redirect('/register'); // Redirect back to the registration page on failure
  }
});

module.exports = router;