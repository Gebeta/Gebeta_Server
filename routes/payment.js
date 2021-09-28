const express = require('express')
var router = express.Router();
const paymentController = require('../controllers/payment.controller')

router.post('/', paymentController.makePayment);

module.exports = router;