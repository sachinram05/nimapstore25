const express = require('express');
const { getCategories, getCategoryById, addCategory, deleteCategory, updateCategory } = require('../controllers/categoryController.js')

const router = express.Router();


router.route("/").get(getCategories).post(addCategory)
router.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);


module.exports = router;