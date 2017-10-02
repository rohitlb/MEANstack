//schema for registration
var mongoose = require('mongoose');

var User = new mongoose.Schema({
    Name : {type : String},
    Number : {type : String},
    Password : {type:String}
});

module.exports = mongoose.model('users',User);