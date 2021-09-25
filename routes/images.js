var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({dest: './public/images/'});
const imageController = require('../controllers/image.controller')

/**
 * get Image
 * 
 * @route Get /items/images
 * @returns {object} 200 - string object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:name', imageController.getImage);

 /**
 * upload Image
 * 
 * @route POST /items/upload
 * @returns {object} 200 - string object
 * @returns {Error}  default - Unexpected error
 */
router.post('/upload', upload.array('itemImg', 5), imageController.uploadImg);
router.post('/rupload', upload.array('restImg', 3), imageController.ruploadImg);

 /**
 * delete Image
 * 
 * @route Get /items/images
 * @returns {object} 200 - string object
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', imageController.deleteImage);

 module.exports = router;
