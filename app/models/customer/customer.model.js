/*
 * @author  : Anuj gupta
 * @desc    : store customer data
 */

var mongoose    = require('mongoose');
var Schema     = mongoose.Schema;

var customerSchema  = new Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    mobileno : {
        type : Number
    },
    status : {
        type : String
    },
    cretated : {
        type : Date,
        default : new Date()
    }
});

var customer    = mongoose.model('customer', customerSchema);
module.exports  = customer;
