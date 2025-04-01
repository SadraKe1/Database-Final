const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Import the Course model
const Instructor = require('../models/instructor'); // Import the Instructor model

// Render the Courses List Page
router.get('/', async (req, res) => {
    try {
        // Fetch courses and populate instructorId, personId, and enrollment data
        const courses = await Course.find()
            .populate({
                path: 'instructorId',
                populate: { path: 'personId', model: 'Person' } // Populate personId to get the instructor's name
            })
            .populate({
                path: 'enrollmentId', // Populate enrollmentId to get enrollment details
                model: 'Enrollment',
                select: 'EnrollmentDate Grade', // Only fetch EnrollmentDate and Grade fields
            });

        console.log('Fetched courses:', courses); // Debugging: Log the fetched courses

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


router.get('/add', async (req, res) => {
    try {
        // Populate the personId field to get the name of the instructor
        const instructors = await Instructor.find().populate('personId'); // Populate personId with Person data
        console.log('Instructors with person details:', instructors); // Debugging: Log the instructors array
        res.render('movie/add', { 
            title: 'Add Course', 
            instructors // Pass the list of instructors to the view
        });
    } catch (error) {
        console.error('Error fetching instructors:', error);
        req.flash('error', 'An error occurred while fetching instructors.');
        res.redirect('/courses');
    }
});

// Handle the Add Course Form Submission
router.post('/add', async (req, res) => {
    try {
        const { courseName, credits, instructorId, grade } = req.body;

        // Create a new course in the database
        const newCourse = new Course({
            courseName,
            credits,
            instructorId,
            grade,
        });
        await newCourse.save();

        req.flash('success', 'Course added successfully.');
        res.redirect('/courses'); // Redirect to the courses list
    } catch (error) {
        console.error('Error adding course:', error);
        req.flash('error', 'An error occurred while adding the course.');
        res.redirect('/courses/add'); // Redirect back to the add course page on failure
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