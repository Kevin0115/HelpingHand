var express = require('express');
var router = express.Router();

var donation_controller = require('../controllers/donation_controller');

router.get('/', donation_controller.get_all_donations);

router.post('/', donation_controller.create_donation);


module.exports = router;