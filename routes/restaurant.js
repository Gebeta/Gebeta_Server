var express = require('express');
var router = express.Router();
const restaurantController = require('../controllers/restaurant.controller')

router.get('/', restaurantController.viewAllrestaurants);

router.get('/:id', restaurantController.viewRestaurant);

router.put('/:id', restaurantController.updateRestaurant);

router.delete('/:id', restaurantController.removeRestaurant);

module.exports = router;
