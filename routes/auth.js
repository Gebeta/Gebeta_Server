var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.controller');
const { validatRequest } = require('../midddlewares/validation/auth')


/**
 * Login
 * 
 * @route POST /auth/login 
 * @group Auth 
 * @param {RESTAURANT.model} restaurant.body.required - User Login 
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', validatRequest('loginUser'), authController.login);

router.post('/checkrest', authController.check);

/**
 * Signup
 * 
 * @route POST /auth/signup
 * @group Auth 
 * @param {RESTAURANT.model} client.body.required - User Sign UP
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', validatRequest('createRestaurant'), authController.signup);

router.post('/clientsignup', authController.clientSignup);

router.post('/clientlogin', authController.clientLogin);

router.post('/driversignup', authController.driver_signup);

router.post('/driverlogin', authController.driver_login);

router.post('/checkUser',authController.checkUser);

router.post('/checkDriver',authController.checkDriver);

router.post('/driversignup',authController.driver_signup);

router.post('/driverlogin',authController.driver_login);

/**
 * Logout
 * 
 * @route POST /auth/logout
 * @group Auth 
 * @returns 200 - message says logout
 * @returns {Error}  default - Something went Wrong
 */
router.post('/logout', authController.logout);


module.exports = router;
