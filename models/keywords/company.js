var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Company = new Schema({
    company_name : {type : String},
    brand_id : [{type : Schema.Types.ObjectId , ref : 'brand'} ],
    keywords : [{company_name}]
});

module.exports = mongoose.model('company',Company);
