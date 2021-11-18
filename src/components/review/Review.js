import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../reviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([])
    useEffect(()=>{
        const saveCart = getDatabaseCart()
        const productKey = Object.keys(saveCart)
        const cartProduct = productKey.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProduct)
    },[])
    return (
        <div>
            <h1>cart item {cart.length}</h1>
            {
                cart.map( pd => <ReviewItem product={pd} key = {pd.key}></ReviewItem>)
            }
            
        </div>
    );
};

export default Review;