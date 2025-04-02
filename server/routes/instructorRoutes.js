const express = require('express');
const router = express.Router();
const { getAllInstructors, createInstructor, updateInstructor, deleteInstructor } = require('../controller/instructorController');
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please log in to access this page.');
    res.redirect('/login');
}

module.exports = { ensureAuthenticated };
router.get('/add', ensureAuthenticated, (req, res) => {
    if (req.user.username !== 'admin') {
        req.flash('error', 'Unauthorized access.');
        return res.redirect('/courses');
    }
    res.render('instructorAdd', { title: 'Add Instructor' });
});

// Handle Add Instructor Form Submission
const Person = require('../models/person'); // Import the Person model
const Instructor = require('../models/instructor'); // Import the Instructor model

// Handle Add Instructor Form Submission
router.post('/add', ensureAuthenticated, async (req, res) => {
    if (req.user.username !== 'admin') {
        req.flash('error', 'Unauthorized access.');
        return res.redirect('/courses');
    }

    try {
        const { firstName, lastName, salary, address } = req.body;

        // Create a new Person document with the required `name` field
        const person = await Person.create({
            name: `${firstName} ${lastName}`, // Combine firstName and lastName for the name field
            firstName,
            lastName,
            address,
        });

        // Create a new Instructor document linked to the Person document
        await Instructor.create({
            personId: person._id, // Link to the Person document
            salary,
        });

        req.flash('success', 'Instructor added successfully.');
        res.redirect('/courses');
    } catch (error) {
        console.error('Error adding instructor:', error);
        req.flash('error', 'Failed to add instructor.');
        res.redirect('/instructors/add');
    }
});
module.exports = router;
