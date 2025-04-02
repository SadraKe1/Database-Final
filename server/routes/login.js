const express = require('express');
const passport = require('passport');
const router = express.Router();

// Render the login page
router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    message: req.flash('error') || ''
  });
});

// Handle login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/courses',
  failureRedirect: '/login',
  failureFlash: true
}));

// Handle logout
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success', 'Logged out successfully.');
    res.redirect('/login');
  });
});

module.exports = router;