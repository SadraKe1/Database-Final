let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let Session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

let app = express();

//configure mongoDB
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to DB URI
mongoose.connect(DB.URI);
let mongDB = mongoose.connection;
mongDB.on('error',console.error.bind(console,'Connection error:'));
mongDB.once('open',() => {
  console.log('Connected to MongoDB');
});

//Set up Express session
app.use(Session({
  secret:"SomeSecret",
  saveUninitialized: false,
  resave:false
}));

// initialize the flash
app.use(flash());

//Initialize the passport 
app.use(passport.initialize());
app.use(passport.session());

//Create an instance of the user model 
let userModel = require('../models/user');
let User = userModel.User; 
passport.use(User.createStrategy());

// serialize and deserialize operations on the user information 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let indexRouter = require('../routes/index');
let blockbusterRouter = require('../routes/blockbuster')


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/blockbuster',blockbusterRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',
  {
    title:"Error"
  }
  );
});

module.exports = app;
