import react, { useEffect, useState } from 'react';
import axios from 'axios';
import './categoryScreen.css'
import { FaEdit, FaTrash } from 'react-icons/fa';
import Title from '../../components/Title';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const CategoryScreen = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();


    const getCategories = async () => {
        setIsLoading(true)
        try {
            await axios.get('http://localhost:5000/categories')
                .then((resp) => {
                    if (resp.data && resp.data.data) {
                        setCategories(resp.data.data);
                    }
                })
                .catch((error) => {
                    throw new Error(error)
                })
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false)
        }
    }


    const handleDelete = async (categoryId) => {
        const confirm = window.confirm('Are you sure you want to delete this category?');
        if (confirm) {
            try {
                await axios.delete(`http://localhost:5000/categories/${categoryId}`); 
                alert('Category deleted successfully!');
                getCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Failed to delete category');
            }
        }
    };

    useEffect(() => {
        getCategories();
    }, [])

    return (
        
            <> <Title title="All Categories" addTitle="+ Add Category" addHandler={() => 
            navigate("/categories/edit", {
                state: {
                    isEdit: false,
                }
            })
            } /> 
            {isLoading ? <Loader /> : categories.length == 0 ? <div className='empty-container-div' > <div> <h2> Empty Categories </h2></div></div>:
            <table className="category-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.categoryId}>
                            <td>{index + 1}</td>
                            <td>{category.categoryName}</td>
                            <td>
                                <button
                                    onClick={() => navigate("/categories/edit", {
                                        state: {
                                            isEdit: true,
                                            category: category,
                                        }})
}
                                    className="action-button edit-button"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(category.categoryId)}
                                    className="action-button delete-button"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </>
    )
}


export default CategoryScreen;