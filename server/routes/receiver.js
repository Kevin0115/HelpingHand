var express = require('express');
var router = express.Router();

var receiver_controller = require('../controllers/receiver_controller');

router.get('/', receiver_controller.get_all_receivers);

router.get('/:rid', receiver_controller.get_receiver);

router.post('/', receiver_controller.create_receiver);

// router.delete('/:rid', receiver_controller.delete_receiver)

// DELETE www.abc.com/receiver/123

module.exports = router;