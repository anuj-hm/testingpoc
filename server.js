var express                 = require('express');
var bodyParser              = require('body-parser');
var methodOverride          = require('method-override');
var mongoose                = require('mongoose');
var http                    = require('http');
var portNumber              = 7000;
var mongourl                = "mongodb://test:switchforif123@ds259586.mlab.com:59586/radigiopoc";
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(methodOverride());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    };
});

//We close connection, protect to keep aliving
app.use(function(req, res, next) {
    res.setHeader('Connection', 'close');
    next();
});

app.use(function(err, req, res, next) {
    var errStr = "Invalid user request";
    //Here we put log
    console.log(errstr);
    return errStr;
});
mongoose.connect(mongourl);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + mongourl);
});
app.get('/', function(req, res){
    res.send('Welcome to DigipatCustomeApi');
});

require('./app/routes/customer/customer.route.js')(app);

//Create server
http.createServer(app).listen(portNumber);
console.log('server running at PORT [%d]', portNumber);
