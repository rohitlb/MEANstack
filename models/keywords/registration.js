var mongoose = require('mongoose');


var User = new mongoose.Schema({
    //general information
    name : {type:String},
    email : {type : String},
    number : {type : String},
    password : {type:String},
    path: { type: String},
    dob : {type:String},
    gender : {type : String},
    blood_group : {type:String},
    marital_status : {type : String},
    height : {type : String},
    weight : {type : String},
    address : {
        addresses : {type : String},
        landmarks : {type : String},
        pin_code : {type : String},
        city : {type : String },
        state : {type : String}
    },
    aadhaar_number : {type : String},
    income : {type : String},
    relative_name : {type : String },
    relative_contact : {type : String},
    relation : {type : String},
    keywords: [{name, email, number, location, income}]
});

module.exports = mongoose.model('user',User);