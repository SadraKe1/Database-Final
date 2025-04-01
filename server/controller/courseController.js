const Course = require('../models/course');
const Instructor = require('../models/instructor'); // Import the Instructor model
const Enrollment = require('../models/enrollment');

// Get all courses and render the list view
exports.getAllCourses = async (req, res) => {
  try {
    // Fetch all courses
    const courses = await Course.find().populate('instructorId');

    // Fetch all enrollments
    const enrollments = await Enrollment.find().populate('CourseID').populate('StudentID');

    // Map grades to courses
    const coursesWithGrades = courses.map((course) => {
      // Find the enrollment for this course
      const enrollment = enrollments.find((enrollment) => {
        return enrollment.CourseID && enrollment.CourseID._id.toString() === course._id.toString();
      });

      // Add the Grade field to the course
      return {
        ...course.toObject(),
        grade: enrollment ? enrollment.Grade : 'N/A', // Add grade or default to 'N/A'
      };
    });

    // Pass the updated courses array to the view
    res.render('movie/list', { 
      title: 'Course List with Grades', 
      courses: coursesWithGrades 
    });
  } catch (error) {
    console.error('Error fetching courses with grades:', error.message);
    res.status(500).send('An error occurred while fetching courses with grades.');
  }
};
exports.renderAddCoursePage = async (req, res) => {
  try {
    // Fetch instructors and populate the personId field
    const instructors = await Instructor.find().populate('personId');
    console.log('Fetched instructors:', instructors); // Debugging log

    res.render('movie/add', { title: 'Add a Course', instructors });
  } catch (error) {
    console.error('Error fetching instructors:', error.message); // Log the error message
    console.error(error.stack); // Log the full error stack for debugging
    res.status(500).send('An error occurred while fetching instructors.');
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { courseName, credits, instructorId, grade } = req.body;

    // Create a new course document
    const newCourse = new Course({
      courseName,
      credits,
      instructorId,
 // Add grade
    });

    // Save the course to the database
    await newCourse.save();

    // Redirect to the course list page
    res.redirect('/courses');
  } catch (error) {
    console.error('Error creating course:', error.message); // Log the error message
    console.error(error.stack); // Log the full error stack for debugging
    res.status(500).send('An error occurred while creating the course.');
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(204).send(); // 204 No Content for successful deletion with no response body
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};