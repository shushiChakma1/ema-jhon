import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for(let i = 0; i < cart.length; i ++){
        const product = cart[i];
        total = total + product.price * product.quantity;
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

    let tax = total/10;
    let grandTotal = shipping + tax + total;
    return (
        <div>
            <h3 className="text-danger">order summary</h3>
            <p>ordered item : {cart.length}</p>
            <p><small>shipping cost : {shipping}</small></p>
            <p>tax : {tax.toFixed(2)}</p>
            <p>total price : {grandTotal.toFixed(2)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;