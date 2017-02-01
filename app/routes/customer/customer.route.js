/*
 * @author  : Anuj gupta
 * @desc    : Handle route for customer crud operations
 */

var customerCtrl = require('../../controllers/customer/customer.controller');

module.exports = function(app) {

    app.route('/customer')
        .post(customerCtrl.apiCC)
        .get(customerCtrl.apiRAC);

    app.route('/customer/:userid')
        .put(customerCtrl.apiUC)
        .get(customerCtrl.apiRC)
        .delete(customerCtrl.apiDC);
};
