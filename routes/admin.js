var express = require('express');
var router = express.Router();

var adminController = require('../controllers/admin.controller');
const { validatRequest } =require('../midddlewares/validation/auth')

router.post('/login', validatRequest('loginUser'), adminController.login);

router.post('/logout', adminController.logout);

module.exports = router;