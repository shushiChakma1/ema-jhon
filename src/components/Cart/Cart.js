import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for(let i = 0; i < cart.length; i ++){
        const product = cart[i];
        total = total + product.price;
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }

    else if(total > 15){
        shipping = 4.99;
    }

    else if(total > 0){
        shipping = 12.99;
    }

    return (
        <div>
            <h3 className="text-danger">order summary</h3>
            <p>orderd item : {cart.length}</p>
            <p><small>shipping cost : {shipping}</small></p>
            <p>total price : {total + shipping}</p>
            <Link to="/review"><button className={'main-button'}>review order</button></Link>
        </div>
    );
};

export default Cart;