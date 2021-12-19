import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fakeData from '../../fakeData';
import happyImage from '../../images/giphy.gif';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../reviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlace, setOrderPlace] = useState(false)


    const navigate = useNavigate();
    const handleProceedOrder = () => {
        navigate('/shipping')
        // setCart([]);
        // setOrderPlace(true)
        // processOrder()
    }

    const removeProduct = (addedProduct) => {
        const newCart = cart.filter(pd => pd.key !== addedProduct)
        setCart(newCart)
        removeFromDatabaseCart(addedProduct)
    }

    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKey = Object.keys(saveCart)
        const cartProduct = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProduct)
    }, [])
    let thankYou;
    if (orderPlace) {
        thankYou = <img src={happyImage} alt="" />
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        product={pd}
                        key={pd.key}
                        removeProduct={removeProduct}
                    ></ReviewItem>)
                }
                {thankYou}

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedOrder} className="main-button">Proceed Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;