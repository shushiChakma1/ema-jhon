import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className = "Header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">shop</Link>
                <Link to="/review">review</Link>
                <Link to="manage">manage</Link>
            </nav>
        </div>
    );
};

export default Header;