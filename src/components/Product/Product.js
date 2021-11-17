import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    // console.log(props.product)
    const { img, name, seller, price, stock, key } = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h5 className='product-name'><Link to={"/product/"+key}>{name}</Link></h5>
                <br />
                <p><small>by {seller}</small></p>
                <br />
                <p>${price}</p>
                <br />
                <p><small>only {stock} left in stock - order soon</small></p>
                { props.showAddToCart && <button 
                className = 'main-button'
                onClick = {() => props.handleClick(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;