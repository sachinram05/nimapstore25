const { Product, Category } = require('../models')

const getProducts = async (req, res) => {
    try {
        const { page = 1, size = 12, categoryId } = req.query;
        console.log('CategoryID', categoryId)

        const offset = (page - 1) * size;
        const limit = parseInt(size);

        const products = await Product.findAndCountAll({
            where: { categoryId },
            include: Category,
            limit,
            offset,
        });
        res.status(201).json({
            message: "Products found success!",
            totalRecords: products.count,
            totalPages: Math.ceil(products.count / limit),
            currentPage: parseInt(page),
            data: products.rows
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        });
    }

}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).json({
                message: "Product not found!",
            });
        }
        res.status(201).json({
            message: "Product found!",
            data: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

const addProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { productName, description, price, categoryName, categoryId } = req.body;
        const product = await Product.create({ productName, description, price, categoryName, categoryId });
        res.status(201).json({
            message: "Product created!",
            data: product
        });
    } catch (error) {
        console.log("EROR", error)
        res.status(500).json({
            message: error.message ? error.message : "product not created!"
        })
    }

}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        const [product] = await Product.update(productData, {
            where: { id: productId }
        }); //0/1

        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            })
        }
        res.status(200).send({
            message: "Product updated!"
        });

    } catch (error) {
        res.status(500).send({
            message: error.message ? error.message : "product not updated!"
        })
    }

}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.destroy({ where: { id: productId } });
        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            })
        }
        res.status(200).send({
            message: "Product deleted!"
        });

    } catch (error) {
        res.status(500).send({
            message: error.message ? error.message : "product not deleted!"
        })
    }
}

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };