let express = require('express');
let router = express.Router();
const passport = require('passport');
let userModel = require('../models/user')
let User = userModel.User;

//controller for index page -> used to organize code
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Blockbuster',username: req.user ? req.user.username:''});
  }

//Get operation for login page 
module.exports.displayLoginPage = (req, res, next)=> {
  if(!req.User)
  {
      res.render('auth/login',
      {
          title:'Login',
          message:req.flash('loginMessage'),
          username:req.User ? req.User.username: ''
      })
  }
  else
  {
      return res.redirect('/');
  }
}

module.exports.processLoginPage = (req,res,next) => {
  passport.authenticate('local',(err,User,info)=>{
      //Server error 
      if(err) 
      {
          return next(err);
      }
      //Login error 
      if(!User)
      {
          req.flash('loginMessage', 'AuthenticationError');
          return res.redirect('/login');
      }
      req.login(User, (err)=>{
          if(err) 
          {
              return next(err);
          }
          return res.redirect('/blockbuster');
      })
  })(req,res,next)
}

module.exports.displayRegisterPage = (req, res, next)=>{
  //Check if the user is not already logged in 
  if(!req.User)
  {
      res.render('auth/register',
          {
              title:'Register',
              message:req.flash('registerMessage'),
              username:req.User ? req.User.username: ''
          })
  }
  else
  {
      return res.redirect('/');
  }
}

module.exports.processRegisterPage = (req,res,next)=>{
  let newUser = new User({
      username: req.body.username,
      //password: req.body.passport,
      email: req.body.email,
      username: req.body.username
  })
  User.register(newUser, req.body.password,(err)=>{
      if(err)
      {
          console.log("Error in inserting the new user data");
          if(err.name=='UserExistsError')
              {
                  req.flash('registerMessage', 'Registration Error: User Already Exists');
              }
          return res.render('auth/register', 
          {
              title:'Register',
              message: req.flash('registerMessage'),
              username:req.User ? req.User.username: '' //Welcome User1/User2
          })
      }
      else
      {
          //if registration is successful 
          return passport.authenticate('local')(req,res,()=>{
              res.redirect('blockbuster')
          })
      }
  })
}

module.exports.performLogout = (req,res,next)=> 
{
  req.logout(function(err){
      if(err){
          return next(err);
      }
  });
  res.redirect('/');
}