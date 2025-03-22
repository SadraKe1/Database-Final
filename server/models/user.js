let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    username: {
        type:String,
        default:"",
        trim:true,
        required: 'Username is required'
    },
    /*password: {
        type:String,
        default:"",
        trim:true,
        required: 'Password is required'
    },*/
    created: {
        type: Date,
        default:Date.now
    },
    update: {
        type: Date,
        default:Date.now
    }},
    {
        collection: "User"
    });

//Configurations for user model 
let options = ({missingPasswordError:'Wrong Password or Password is missing'});
User.plugin(passportLocalMongoose,options);
module.exports.User = mongoose.model('User', User);