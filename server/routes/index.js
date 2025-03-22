let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');

//Get index page 
router.get('/', indexController.displayHomePage);

//Get router for homepage
router.get('/home', indexController.displayHomePage);

//Get router for login page 
router.get('/login', indexController.displayLoginPage);

//Post router for login page 
router.post('/login', indexController.processLoginPage);

//Get router for registration page 
router.get('/register', indexController.displayRegisterPage);

//Post router for registration page 
router.post('/register', indexController.processRegisterPage);

//Get router for logout page 
router.get('/logout', indexController.performLogout);

module.exports = router;
