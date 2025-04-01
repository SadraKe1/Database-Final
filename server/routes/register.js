const express = require('express');
const router = express.Router();
const Person = require('../models/person'); // Import the Person model
const Student = require('../models/student'); // Import the Student model

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
    // Extract form data
    const { firstName, lastName, username, address, displayName, fee } = req.body;

    // Combine firstName and lastName into a single name field
    const name = `${firstName} ${lastName}`;

    // Create a new person in the Person database
    const newPerson = new Person({ name, username, address, displayName, fee: parseFloat(fee) });
    await newPerson.save();

    // Add the person as a student in the Student database
    const newStudent = new Student({
      personId: newPerson._id, // Link the student to the person
      fee: parseFloat(fee), // Use the same fee value
    });
    await newStudent.save();

    console.log('Person and Student registered successfully:', newPerson.name);

    // Redirect to the login page after successful registration
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    req.flash('error', error.message || 'Registration failed.');
    res.redirect('/register'); // Redirect back to the registration page on failure
  }
});

module.exports = router;