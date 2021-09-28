var express = require('express');
var router = express.Router();
const orderController = require('../controllers/order.controller')

router.get('/r/:id', orderController.viewAllorders);

router.get('/activeorders', orderController.viewActiveOrders);

router.get('/completedorders', orderController.viewCompletedOrders);

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);

router.get('/:id', orderController.viewOrder);

router.put('/:id', orderController.updateOrder);

router.put('/updateorder/:id', orderController.updateOrderByDriver);

router.delete('/:id', orderController.removeOrder);

module.exports = router;
