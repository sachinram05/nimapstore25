const express = require('express');
const protect = require("../middlewares/authMiddleware.js")
const { getProducts, addProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productController.js');

const router = express.Router();

router.route('/').get( protect, getProducts).post(addProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct)


module.exports = router;