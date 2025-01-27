import './navBar.css'
import logoImage from '../../assets/nimapLogo.png'
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <div className='nav-container'>
            <div className='title-container' >
                <img src={logoImage} alt="Logo" />
                <span class="title"><Link className='titleLink' to="/">NIMAP STORE</Link></span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Products</Link>
                </li>
                <li>
                    <Link to="/categories">Categories</Link>
                </li>
            </ul>
        </div>
    )
}


export default NavBar;