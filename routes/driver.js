var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({dest: './public/images/'});
const driverController = require('../controllers/driver.controller')

router.get('/', driverController.viewAlldrivers);

router.get('/:id', driverController.viewDriver);

router.put('/update', driverController.updateCar);

router.put('/:id',driverController.update);

router.put('/ul/:id', driverController.updateLocation);

router.post('/upload', upload.array('driverImg', 1) ,driverController.updateDriver)

router.delete('/:id', driverController.removeDriver);

module.exports = router;
