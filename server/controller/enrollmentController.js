const Enrollment = require('../models/enrollment');

// Get all enrollments


exports.getAllEnrollments = async (req, res) => {
  try {
    // Fetch all enrollments and populate related fields
    const enrollments = await Enrollment.find()
      .populate('StudentID') // Populate StudentID with Student data
      .populate('CourseID'); // Populate CourseID with Course data

    // Pass enrollments to the view
    res.render('movie/list', { 
      title: 'Enrollment List', 
      enrollments 
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error.message);
    res.status(500).send('An error occurred while fetching enrollments.');
  }
};

// Create an enrollment
// Create an enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const { StudentID, CourseID, EnrollmentDate, Grade } = req.body;

    // Log the incoming data for debugging
    console.log('Creating enrollment with data:', { StudentID, CourseID, EnrollmentDate, Grade });

    // Create a new enrollment document
    const newEnrollment = new Enrollment({
      StudentID,
      CourseID,
      EnrollmentDate: new Date(EnrollmentDate), // Ensure the date is properly formatted
      Grade, // Add grade to the enrollment
    });

    // Save the enrollment to the database
    await newEnrollment.save();
    console.log('Enrollment created:', newEnrollment);

    res.status(201).json(newEnrollment);
  } catch (error) {
    console.error('Error creating enrollment:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update enrollment
exports.updateEnrollment = async (req, res) => {
  try {
    const { Grade } = req.body; // Allow updating the grade
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { Grade }, // Only update the grade field
      { new: true }
    );
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};