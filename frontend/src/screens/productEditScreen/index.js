import { useState } from 'react';
import axios from 'axios';
import './productEditScreen.css'
import { useLocation, Link } from 'react-router-dom';

const ProductEditScreen = () => {
    const location = useLocation();
    const { isEdit = false, product, categories } = location.state || {};

    const [productName, setProductName] = useState(isEdit ? product.productName : '');
    const [description, setDescription] = useState(isEdit ? product.description : '');
    const [price, setPrice] = useState(isEdit ? product.price : null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(isEdit ? product.categoryId : null)
    const [isLoading, setIsLoading] = useState(false)


    const getCategoryName = (id) => {
        const catData = categories.find((cat) => cat.categoryId == id)
        return catData.categoryName;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedCategoryId == null) {
                alert("Please select category or create if empty")
                return;
            }
            if (price < 0) {
                alert("price should be positive number")
                return;
            }
            setIsLoading(true)
            if (isEdit) {
                await axios.put(`http://localhost:5000/products/${product.id}`, {
                    productName, description, price, categoryName: getCategoryName(selectedCategoryId), categoryId: selectedCategoryId
                }).then(() => {
                    alert("product updated success!")
                }).catch((error) => {
                    throw new Error(error.message)
                })
            } else {

                await axios.post('http://localhost:5000/products', {
                    productName, description, price, categoryName: getCategoryName(selectedCategoryId), categoryId: selectedCategoryId
                }).then(() => {
                    setProductName("")
                    setDescription("")
                    setPrice(0)
                    alert("product added Success")
                }).catch((error) => {
                    throw new Error(error.message)
                })
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='edit-container'>
            <Link to={-1} className="back-link">
                Go Back
            </Link>
            <div className='edit-form-container'>
                <div className="form-container">

                    <h1>{isEdit ? "Update product" : 'Add product'}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name:</label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Enter product name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                id="price"
                                name="price"
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter price"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Description:</label>
                            <textarea
                                type="text"
                                id="desc"
                                name="desc"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description"
                                rows="5"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <select id="options" value={selectedCategoryId} onChange={(e) => {
                                setSelectedCategoryId(e.target.value)
                            }}>
                                <option value="" disabled selected>Select an category</option>
                                {categories && categories.map((category) => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                    </option>))}
                            </select>
                        </div>

                        <button type="submit" className="submit-button">
                            {isEdit ? "Update product" : "Add product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default ProductEditScreen;