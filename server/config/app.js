const Person = require('../models/person');
const Instructor = require('../models/instructor');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment'); // Import the Enrollment model
const Student = require('../models/student'); // Import the Student model
const User = require('../models/user'); // Import the User model
const login = require('../routes/login'); // Adjust the path as needed
const flash = require('connect-flash');
const registerRouter = require('../routes/register'); // Import the register route

// Add the register route

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let Session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
passport.use(new localStrategy(User.authenticate())); // Use passport-local-mongoose's authenticate method
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
let app = express();


// Configure MongoDB
let mongoose = require('mongoose');
let DB = require('./db'); // Your existing DB configuration file

// Connect to MongoDB
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection error:'));
mongoDB.once('open', async () => {
  console.log('Connected to MongoDB');
  await seedDatabase(); // Seed the database after connecting
});

// Seed Database Function
const seedDatabase = async () => {
  try {
    // Create a person for Mariyam Member
    let mariyamPerson = await Person.findOne({ name: 'Mariyam Member' });
    if (!mariyamPerson) {
      mariyamPerson = await Person.create({
        name: 'Mariyam Member',
        address: '789 Maple Avenue',
      });
      console.log(`Created person: ${mariyamPerson.name}`);
    } else {
      console.log('Person "Mariyam Member" already exists.');
    }

    // Create a student for Mariyam Member
    let mariyamStudent = await Student.findOne({ personId: mariyamPerson._id });
    if (!mariyamStudent) {
      mariyamStudent = await Student.create({
        fee: 5000, // Example fee amount
        personId: mariyamPerson._id,
      });
      console.log(`Created student: ${mariyamStudent._id}`);
    } else {
      console.log('Student "Mariyam Member" already exists.');
    }

    // Create an enrollment document for Mariyam
    const course = await Course.findOne({ courseName: 'Math 101' });
    if (course) {
      const existingEnrollment = await Enrollment.findOne({
        StudentID: mariyamStudent._id,
        CourseID: course._id,
      });

      if (!existingEnrollment) {
        const enrollment = await Enrollment.create({
          EnrollmentID: new mongoose.Types.ObjectId(),
          StudentID: mariyamStudent._id,
          CourseID: course._id,
          EnrollmentDate: new Date(),
          Grade: 'A',
        });

        console.log(`Created enrollment: ${enrollment._id}`);
      } else {
        console.log('Enrollment for Mariyam in "Math 101" already exists.');
      }
    } else {
      console.log('Course "Math 101" not found. Enrollment not created.');
    }

    console.log('Database updates completed!');
  } catch (error) {
    console.error('Error updating database:', error);
  }
};

// Set up Express session
app.use(
  Session({
    secret: 'SomeSecret',
    saveUninitialized: false,
    resave: false,
  })
);

// Initialize Flash messages
app.use(flash());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); // Use passport-local-mongoose's authenticate method
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// View Engine Setup (Keeping EJS for frontend)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));
// Middleware to make the logged-in user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user; // `req.user` is set by Passport
  next();
});
// Routes
let courseRouter = require('../routes/courseRoutes');
let studentRouter = require('../routes/studentRoutes');
let instructorRouter = require('../routes/instructorRoutes');
let enrollmentRouter = require('../routes/enrollmentRoutes');
let personRouter = require('../routes/personRoutes');

app.use('/courses', courseRouter);
app.use('/students', studentRouter);
app.use('/instructors', instructorRouter);
app.use('/enrollments', enrollmentRouter);
app.use('/persons', personRouter);
app.use('/', login); // Ensure the login route is included
app.use('/', registerRouter);
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'The page you are looking for does not exist.'));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message || 'An unexpected error occurred.';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    error: {
      message: res.locals.message,
      status: err.status || 500,
    },
  });
});

module.exports = app;