const { Category } = require('../models')


const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(201).json({
            message: "Categories found success!",
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            message: error.message ? error.message : "categories not found!"
        })
    }

}

const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            res.status(404).json({
                message: "Category not found!",
            });
        }
        res.status(201).json({
            message: "Category found!",
            data: category
        });

    } catch (error) {
        res.status(500).json({
            message: error.message ? error.message : "category not found!"
        })
    }

}

const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const category = await Category.create({ categoryName });
        res.status(201).json({
            message: "Category created!",
            data: category
        });
    } catch (error) {
        res.status(500).json({
            message: error.message ? error.message : "categories not added!"
        })
    }

}

const updateCategory = async (req, res) => {
    try {
        const selectedId = req.params.id;
        const { categoryName } = req.body;
        console.log(selectedId, categoryName)
        const [category] = await Category.update({ categoryName: categoryName }, {
            where: { categoryId: selectedId }
        });
        console.log(category)

        if (!category) {
            res.status(404).json({
                message: "category not found!"
            })
        }
        res.status(200).send({
            message: "category updated!"
        });

    } catch (error) {
        res.status(500).send({
            message: error.message ? error.message : "categories not updated!"
        })
    }

}

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.destroy({ where: { categoryId: categoryId } });
        if (!category) {
            res.status(404).json({
                message: "category not found!"
            })
        }
        res.status(200).send({
            message: "category deleted!"
        });

    } catch (error) {
        res.status(500).send({
            message: error.message ? error.message : "categories not deleted!"
        })
    }
}

module.exports = { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory };