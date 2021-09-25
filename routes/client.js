var express = require('express');
var multer  = require('multer');
var upload = multer({dest: './public/images/'});
var router = express.Router();

const clientController = require('../controllers/client.controller')

/**
 * Get All clients
 * 
 * @route GET /clients/
 * @group client 
 * @security JWT
 * @returns {object} 200 - List of clients
 * @returns {Error}  default - Unexpected error
 */
router.get('/', clientController.viewAllclients);


/**
 * Get a client by Id
 * 
 * @route GET /clients/{id}
 * @group client 
 * @param {string} id.path.required - client id
 * @security JWT
 * @returns {object} 200 - A client object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', clientController.viewClient);

/**
 * Update a client 
 * 
 * @route PATCH /clients/{id}
 * @group client 
 * @param {string} id.path.required - client id
 * @param {client.model} client.body.required - client body
 * @security JWT
 * @returns {object} 200 - returns the updated client object 
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', clientController.updateClient);
router.post('/uploadProfile', upload.array('clientImg', 1) ,clientController.uploadProfile)

/**
 * Remove a client  with id
 * 
 * @route DELETE /clients/{id}
 * @group client 
 * @param {string} id.path.required - client id
 * @security JWT
 * @returns {object} 200 - will return a string that says successfully deleted
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', clientController.removeClient);

module.exports = router;
