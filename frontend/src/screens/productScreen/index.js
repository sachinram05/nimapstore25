import { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import './productScreen.css'
import logoImage from '../../assets/nimapLogo.png'
import dummyProductImage from '../../assets/dummy2.jpg'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Title from '../../components/Title';


const ProductScreen = () => {
    const pageSize = 12;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [currentCategoryId, setCurrentCategoryId] = useState(1)
    const navigate = useNavigate();

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalProducts);

    const getAllproducts = async () => {
        try {
            setIsLoading(true);
            setProducts([]);
            setTotalPages(0)
            setTotalProducts(0)
            await axios.get('http://localhost:5000/products', {
                params: { page: currentPage, size: pageSize, categoryId: currentCategoryId }
            })
                .then((resp) => {
                    console.log(resp);
                    console.log(resp.data.data)
                    if (resp.data && resp.data.data && resp.data.data.length > 0) {
                        setProducts(resp.data.data);
                        setTotalPages(resp.data.totalPages);
                        setTotalProducts(resp.data.totalRecords)
                    }
                })
                .catch((error) => {
                    throw new Error(error)
                })
        } catch (error) {
            console.log(error.message);
        }
        finally {
            setIsLoading(false)
        }
    }

    const getCategories = async () => {
        try {
            await axios.get('http://localhost:5000/categories')
                .then((resp) => {
                    // console.log()
                    if (resp.data && resp.data.data && resp.data.data.length > 0) {
                        setCategories(resp.data.data);
                    }
                })
                .catch((error) => {
                    throw new Error(error)
                })
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getAllproducts();
    }, [currentPage, currentCategoryId])

    useEffect(() => {
        getCategories()
    }, [])

    const handlePageChange = (newPage) => {
        console.log(newPage)
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const deleteHandler = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this product?');
        if (confirm) {
            try {
                await axios.delete(`http://localhost:5000/products/${id}`);
                alert('Product deleted!');
                await getAllproducts();
            } catch (error) {
                alert('Failed to delete category');
            }
        }
    }

    return (
        <div>
        {isLoading ?
            <Loader />
            : products.length <= 0 ? <div className='empty-container-div' > <div> <h2>No Items Found</h2></div></div> :
                <div className='body-container'>
                    <Title title="Latest Products" addTitle="+ Add Product" addHandler={() => {
                        navigate("/product/edit", {
                            state: {
                                isEdit: false,
                                categories: categories
                            }
                        })
                    }} />
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <div className="image-container">
                                    <img
                                        src={dummyProductImage}
                                        alt={product.productName}
                                        className="product-image"
                                    />
                                    <button className="edit-icon" onClick={() => {
                                        navigate("/product/edit", {
                                            state: {
                                                isEdit: true,
                                                product: product,
                                                categories: categories
                                            }
                                        })
                                    }}>
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="delete-icon"
                                        onClick={() => deleteHandler(product.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                                <div className="product-details">
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}>
                                        <h2 className="product-name">{product.productName.length > 20 ? `${product.productName.substring(0, 30)}...`:product.productName}</h2>
                                        <p className="product-price">₹{product.price}</p>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "start",
                                        alignItems: "start"
                                    }}>
                                        <p className="product-category">{product.categoryName}</p>
                                        <p className="product-description">{product.description.length > 60 ?
                                            `${product.description.substring(0, 60)}...` : product.description
                                        }</p>
                                    </div>


                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>}
            <div className='pagination-container'>
                <select id="options" value={currentCategoryId} onChange={(e) => {
                    setCurrentPage(1)
                    setCurrentCategoryId(e.target.value)
                }}>
                    <option value="" disabled selected>Select an category</option>
                    {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.categoryName}
                        </option>))}
                </select>
                <div id='pagination'>
                    <p>{start}-{end} of {totalProducts}</p>
                    <ResponsivePagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>

            </div>
        </div>
                
    )
}


export default ProductScreen;