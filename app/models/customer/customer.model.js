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
        type : String
    },
    mobileno : {
        type : Number
    },
    cretated : {
        type : Date,
        default : new Date()
    }
});

var customer    = mongoose.model('customer', customerSchema);
module.exports  = customer;
