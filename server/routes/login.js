const express = require('express');
const passport = require('passport'); // Import passport for authentication
const router = express.Router();

// Render the login page
router.get('/login', (req, res) => {
  res.render('auth/login', { 
    title: 'Login', 
    message: req.flash('error') || '' // Pass any error messages
  });
});

// Handle login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/courses', // Redirect to /courses on success
  failureRedirect: '/login', // Redirect back to the login page on failure
  failureFlash: true // Enable flash messages for errors
}));

module.exports = router;