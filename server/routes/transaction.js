var express = require('express');
var router = express.Router();

var transaction_controller = require('../controllers/transaction_controller');

router.post(`/`, transaction_controller.create_transaction);



module.exports = router;