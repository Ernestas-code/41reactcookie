import React from 'react';

const ShoppingCart = ({ cartItems, onRemove }) => {

    return (
        <div>
            {cartItems.length === 0 && <p>No items in cart</p> }
            {cartItems.map((item) => (
                <div key={item.id} >
                    <img src={item.image} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "contain" }}  />
                    <p><strong>{item.title}</strong></p>
                    <p>${item.price}</p>
                    <button onClick={()=> onRemove(item.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ShoppingCart;