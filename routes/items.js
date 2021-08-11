var express = require('express');
var router = express.Router();
const itemController = require('../controllers/item.controller')

/**
 * Get All items
 * 
 * @route GET /items/
 * @group item 
 * @security JWT
 * @returns {object} 200 - List of items
 * @returns {Error}  default - Unexpected error
 */
router.get('/', itemController.viewAllitems);


/**
 * Get a item by Id
 * 
 * @route GET /items/{id}
 * @group item 
 * @param {string} id.path.required - item id
 * @security JWT
 * @returns {object} 200 - A item object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', itemController.viewitem);

/**
 * Add item
 * 
 * @route POST /items
 * @group item 
 * @param {item.model} item.body.required - Add item
 * @returns {object} 200 - item object
 * @returns {Error}  default - Unexpected error
 */
router.post('/', itemController.additem);

/**
 * Update a item  with id
 * 
 * @route put /items/{id}
 * @group item 
 * @param {string} id.path.required - item id
 * @param {item.model} item.body.required - item body
 * @security JWT
 * @returns {object} 200 - returns the updated item object 
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', itemController.updateitem);

/**
 * Remove a item  with id
 * 
 * @route DELETE /items/{id}
 * @group item 
 * @param {string} id.path.required - item id
 * @security JWT
 * @returns {object} 200 - will return a string that says successfully deleted
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', itemController.removeitem);

module.exports = router;
