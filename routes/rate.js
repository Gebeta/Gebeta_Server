var express = require('express');
var router = express.Router();
const rateController = require('../controllers/rate.controller')

router.get('/', rateController.viewAllRating);


router.post('/', rateController.rateRestaurant);

router.put('/update/:id', rateController.updateRating);

router.get('/:id', rateController.viewRating);

module.exports = router;
