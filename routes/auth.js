var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.controller');
const { validatRequest } =require('../midddlewares/validation/auth')


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

/**
 * Signup
 * 
 * @route POST /auth/signup
 * @group Auth 
 * @param {RESTAURANT.model} client.body.required - User Sign UP
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', validatRequest('createUser'),authController.signup);

router.post('/clientsignup',authController.clientSignup);


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
