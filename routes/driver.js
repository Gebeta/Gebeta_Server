var express = require('express');
var router = express.Router();
const driverController = require('../controllers/driver.controller')

router.get('/', driverController.viewAlldrivers);

router.get('/:id', driverController.viewDriver);

router.put('/:id', driverController.updateDriver);

router.delete('/:id', driverController.removeDriver);

module.exports = router;
