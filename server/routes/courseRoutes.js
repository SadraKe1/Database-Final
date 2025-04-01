const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Import the Course model
const Instructor = require('../models/instructor'); // Import the Instructor model

// Render the Courses List Page
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('instructorId'); // Populate instructor details
        res.render('movie/list', { 
            title: 'Courses List', 
            courses 
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        req.flash('error', 'An error occurred while fetching the courses.');
        res.redirect('/');
    }
});

// Render the Edit Course Page
router.get('/edit/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id); // Find the course by ID
        const instructors = await Instructor.find(); // Fetch all instructors

        if (!course) {
            req.flash('error', 'Course not found.');
            return res.redirect('/courses');
        }

        res.render('movie/edit', { 
            title: 'Edit Course', 
            course,
            instructors // Pass the list of instructors to the view
        });
    } catch (error) {
        console.error('Error fetching course or instructors:', error);
        req.flash('error', 'An error occurred while fetching the course or instructors.');
        res.redirect('/courses');
    }
});

// Handle the Edit Course Form Submission
router.post('/edit/:id', async (req, res) => {
    try {
        const { courseName, credits, instructorId, grade } = req.body;

        // Update the course in the database
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { courseName, credits, instructorId, grade },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedCourse) {
            req.flash('error', 'Course not found.');
            return res.redirect('/courses');
        }

        req.flash('success', 'Course updated successfully.');
        res.redirect('/courses'); // Redirect to the courses list
    } catch (error) {
        console.error('Error updating course:', error);
        req.flash('error', 'An error occurred while updating the course.');
        res.redirect(`/courses/edit/${req.params.id}`); // Redirect back to the edit page
    }
});

module.exports = router;