let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');
let blockbuster = require('../models/blockbuster')

//controller for recipe page -> used to organize code

//controller for displaying the recipes list
module.exports.displayMovieList = (req,res,next) => {
    blockbuster.find((err,movielist) => {
        if(err)
        {
            return console.error(err);
        }
        else 
        {
            res.render('movie/list',{
                title : 'Rental List', 
                MovieList : movielist,
                username: req.user ? req.user.username:''
            })
        }
    });
};

//controller for displaying the add page
module.exports.displayAddPage = (req,res,next) =>  {
    res.render('movie/add',{title:'Add Rental Movie',
    username: req.user ? req.user.username:''})
};

//controller for adding contents on add page
module.exports.processAddPage = (req,res,next) =>  {
    let newMovie = blockbuster ({
        "user" : req.body.user,
        "subscriptionTier" :req.body.subscriptionTier,
        "movieName" : req.body.movieName,
        "rentDate" : req.body.rentDate,
        "returnDate":req.body.returnDate
    });
    blockbuster.create(newMovie,(err,Movie) => {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.redirect('/blockbuster');
        }
    })
};

//controller for displaying edit page
module.exports.displayEditPage = (req,res,next) =>  {
    let id = req.params.id;
    blockbuster.findById(id,(err,movieToEdit)=> {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.render('movie/edit',{title:'Edit Rental Movie',MovieList:movieToEdit,
            username: req.user ? req.user.username:''});
        }
    })
};

//controller for processing the edit page
module.exports.processEditPage = (req,res,next) =>  {
    let id = req.params.id;
    let updateMovie = blockbuster({
        "_id":id,
        "user" : req.body.user,
        "subscriptionTier" :req.body.subscriptionTier,
        "movieName" : req.body.movieName,
        "rentDate" : req.body.rentDate,
        "returnDate":req.body.returnDate
    });
    blockbuster.updateOne({_id:id},updateMovie,(err)=> {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.redirect('/blockbuster');
        }
    })
};

//controller for deleting items
module.exports.performDeletePage = (req,res,next) =>  {
    let id = req.params.id;
    blockbuster.deleteOne({_id:id},(err) => {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.redirect('/blockbuster')
        }
    })
};
