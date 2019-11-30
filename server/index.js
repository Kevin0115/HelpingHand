// Require dependencies
var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var STATIC_ROOT = path.resolve(__dirname, './public');

// Middleware
function cors(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
  next();
}
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(bodyParser.urlencoded({extended: true}))

// Import Routes
var receiver = require('./routes/receiver');
var merchant = require('./routes/merchant');
var donation = require('./routes/donation');
var transaction = require('./routes/transaction');

// Declare application parameters
// Will have to change this if moving to a VM
var HTTP_PORT = 8080;

// Routes
app.use('/', express.static(STATIC_ROOT));
app.use('/receiver', receiver);
app.use('/merchant', merchant);
app.use('/donation', donation);
app.use('/transaction', transaction);

// Server
var httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT, function() {
  console.log('[Express.js] Server listening on PORT: '+ HTTP_PORT);
});
