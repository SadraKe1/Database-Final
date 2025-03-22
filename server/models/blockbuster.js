let mongoose = require('mongoose');
//creates the blockbuster model
let blockbusterModel = mongoose.Schema({
    user : String,
    subscriptionTier : String,
    movieName : String,
    rentDate : String,
    returnDate : String,
    },
    {
        collection: "movies"
    }
)

//make recipeModel public
module.exports = mongoose.model('Blockbuster',blockbusterModel);