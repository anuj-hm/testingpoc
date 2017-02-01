/*
 * @author  : Anuj gupta
 * @desc    : manage language related data
 */

var CustomerModel       = require( '../../models/customer/customer.model' );

/**
 * @name create
 * @author Anuj
 * @description Store customer
 * @param {Object} data
 * @param {function} callback
 * @returns {function} callback
 */
function create(data, callback) {

    var customer = new CustomerModel({
        name     : data.name,
        email    : data.email,
        mobileno : data.mobileno
    });

    customer.save(function(err, res) {
        if(err) {
            console.log("Unable to save customer due to", JSON.stringify(err));
            return callback(err, null);
        }
        return callback(err, customer);
    });
};

/**
 * @name update
 * @author Anuj
 * @description update customer
 * @param {Object} data
 * @param {function} callback
 * @returns {function} callback
 */
function update(data, callback) {

        var userid = data.userid;
    CustomerModel.findOneAndUpdate({_id : userid}, data, {new:true}, function(err, res) {
        if(err) {
            console.log("Unable to update customer %s due to",userid, JSON.stringify(err));
            return callback(err, null);
        }
        console.log("Updated customer %s successfully", userid);
        return callback(null, res);
    });
};

/**
 * @name getAll
 * @author Anuj
 * @description get all customer
 * @param {function} callback
 * @returns {function} callback with error or res object.
 */
function getAll(callback) {
    CustomerModel.find({}, function(err, res) {
        if(err) {
            console.log("Unable to get all customer due to %s", JSON.stringify(err));
            return callback(err, null);
        }
        console.log("return All customer");
        return callback(null, res);
    });
};

/**
 * @name remove
 * @author Anuj
 * @description remove customer
 * @param {string} userid
 * @param {function} callback
 * @returns {function} callback
 */
function remove(userid, callback) {

    CustomerModel.remove({_id : userid}, function(err, res) {
        if(err) {
            console.log("Unable to delete customer %s due to %s",userid, JSON.stringify(err));
            return callback(err, null);
        }
        console.log("deleted customer %s successfully", userid);
        return callback(null, res);
    });
};

/**
 * @name getCustomerByID
 * @author Anuj
 * @description get customer by id
 * @param {string} userid
 * @param {function} callback
 * @returns {function} callback
 */
function getCustomerByID(userid, callback) {

    CustomerModel.findOne({_id : userid}, function(err, res) {
        if(err) {
            console.log("Unable to get customer due to", JSON.stringify(err));
            return callback(err, null);
        }
        if(!res) {
            console.log("Invalid customer id [%s] supplied ", userid);
            return callback("Invalid customer id", null);
        }
        console.log("return customer id [%s] ", userid);
        return callback(null, res);
    });
}

/**
 * Restful wrapper to call create function.
 * @param {Object} req
 * @param {Object} rsp
 */
function apiCC(req, rsp) {

    var data = {};
    if(req.body.name) {
        data.name  = req.body.name;
    }
    if(req.body.email) {
        data.email  = req.body.email;
    }
    if(req.body.mobileno) {
        data.mobileno  = req.body.mobileno;
    }
    create(data, function(err, res) {
        if(err) {
            rsp.send(err);
        }
        else {
            rsp.send({
                customer: res
            });
        }
    });
};

/**
 * Restful wrapper to call update function.
 * @param {Object} req
 * @param {Object} rsp
 */
function apiUC(req, rsp) {

    var data = {};
    data.userid  = req.params.userid;
    if(req.body.name) {
        data.name  = req.body.name;
    }
    if(req.body.email) {
        data.email  = req.body.email;
    }
    if(req.body.mobileno) {
        data.mobileno  = req.body.mobileno;
    }
    update(data, function(err, res) {
        if(err) {
            rsp.send(err);
        }
        else {
            rsp.send({
                customer: res
            });
        }
    });
};

/**
 * Restful wrapper to call get function.
 * @param {Object} req
 * @param {Object} rsp
 */
function apiRAC(req, rsp) {
    getAll(function(err, res) {
        if(err) {
            rsp.send(err);
        }
        else {
            rsp.send({
                customers: res
            });
        }
    });
};

/**
 * Restful wrapper to call remove function.
 * @param {Object} req
 * @param {Object} rsp
 */
function apiDC(req, rsp) {

    var userid = req.params.userid;
    remove(userid, function(err, res) {
        if(err) {
            rsp.send(err);
        }
        else {
            rsp.send({
                customer: res
            });
        }
    });
};

/**
 * Restful wrapper to call getAll function.
 * @param {Object} req
 * @param {Object} rsp
 */
function apiRC(req, rsp) {

    var userid = req.params.userid;

    getCustomerByID(userid, function(err, res) {
        if(err) {
            rsp.send(err);
        }
        else {
            rsp.send({
                customer: res
            });
        }
    });
};

/*
 * Exporting functions from modules
 */
module.exports.apiCC                = apiCC;
module.exports.apiUC                = apiUC;
module.exports.apiRAC               = apiRAC;
module.exports.apiDC                = apiDC;
module.exports.apiRC                = apiRC;
