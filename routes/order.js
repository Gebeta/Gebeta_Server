var express = require('express');
var router = express.Router();
const orderController = require('../controllers/order.controller')

router.get('/r/:id', orderController.viewAllorders);

router.get('/:id', orderController.viewOrder);

router.put('/:id', orderController.updateOrder);

router.delete('/:id', orderController.removeOrder);

module.exports = router;
