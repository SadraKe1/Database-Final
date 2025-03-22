let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');

// need to connect with blockbuster model
let blockbuster = require('../models/blockbuster')
let blockbusterController = require('../controller/blockbuster')

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/*CRUD Operation */
// Read operation 
// Get route for the movie list 
router.get('/', blockbusterController.displayMovieList)

/*Perform add operation  */
/*Get route for displaying the ADD-Page -- Create Operation */
router.get('/add', requireAuth, blockbusterController.displayAddPage)

/*Post route for processing the ADD-Page -- Create Operation */
router.post('/add', requireAuth, blockbusterController.processAddPage)

/*Perform edit operation  */
/*Get route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id', requireAuth, blockbusterController.displayEditPage)
/*Post route for displaying the Edit Operation -- Update Operation */
router.post('/edit/:id', requireAuth, blockbusterController.processEditPage)

/*Perform delete operation  */
/*Get to perform Delete Operation -- Deletion */
router.get('/delete/:id', requireAuth, blockbusterController.performDeletePage)

module.exports = router;