var mongoose = require('mongoose'),
    bluebird = require('bluebird');

mongoose.Promise = bluebird;

var UserSchema = new mongoose.Schema(
    {
        name: {type: String},
        password : {type: String}
    }
);

module.exports = mongoose.model('UserSchema',UserSchema);