import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity} = props.product
    const reviewStyle = {
        borderBottom:'1px solid lightgray',
        marginBottom : '5px',
        paddingBottom: '5px',
        marginLeft : '200px'
    }
    return (
        <div style={reviewStyle} className="remove-item">
            <h4 className = "product-name">{name} </h4>
            <p>quantity : {quantity}</p>
            <br/>
            <button className= "main-button">remove</button>
        </div>
    );
};

export default ReviewItem;