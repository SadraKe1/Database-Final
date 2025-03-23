let mongoose = require('mongoose');
//creates the blockbuster model
let blockbusterModel = mongoose.Schema({
    student : String,
    course : String,
    instructor : String,
    enrollmentDate : String,
    grade : String,
    },
    {
        collection: "movies"
    }
)

//make recipeModel public
module.exports = mongoose.model('Blockbuster',blockbusterModel);