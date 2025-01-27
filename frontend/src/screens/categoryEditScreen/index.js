import { useState } from 'react';
import axios from 'axios';
import './categoryEditScreen.css'
import { useLocation, Link } from 'react-router-dom';

const CategoryEditScreen = () => {
    const location = useLocation();
    const { isEdit = false, category } = location.state || {};

    const [categoryName, setCategoryName] = useState(isEdit ? category.categoryName : '');
    const [isLoading, setIsLoading] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            if (isEdit) {
                await axios.put(`http://localhost:5000/categories/${category.categoryId}`, {
                    categoryName
                }).then(() => {
                    alert("category updated success!")
                }).catch((error) => {
                    throw new Error(error)
                })
            } else {
                await axios.post('http://localhost:5000/categories', {
                    categoryName
                }).then(() => {
                    setCategoryName("")
                    alert("category added Success")
                }).catch((error) => {
                    throw new Error(error)
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

                    <h1>{isEdit ? 'Update Category' : "Add Category"}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="categoryName">Category Name:</label>
                            <input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Enter category name"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            {isEdit ? 'update category' : "add category"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default CategoryEditScreen;