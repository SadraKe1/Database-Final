const express = require('express');
const router = express.Router();
const passport = require('passport');

// Render the login page
router.get('/login', (req, res) => {
  res.render('auth/login', { 
    title: 'Login', 
    message: req.flash('error') || '' // Pass the error message (if any)
  });
});
// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.redirect('/');
      }
      res.redirect('/login'); // Redirect to login page after logout
    });
  });
  
  module.exports = router;
// Handle login form submission with a custom callback
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err); // Log any errors
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed:', info.message); // Log the failure message
      req.flash('error', info.message || 'Invalid username or password.');
      return res.redirect('/login'); // Redirect back to login page
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err); // Log any errors during login
        return next(err);
      }
      console.log('Authentication successful for user:', user.username); // Log success
      return res.redirect('/'); // Redirect to home page on success
    });
  })(req, res, next);
});

module.exports = router;