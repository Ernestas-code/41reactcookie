import React from 'react';

const FetchProduct = ({products, onAddToCart}) => {


    return (
        <div className= " d-flex gap20 " >
            {products.map((product) => (
                <div key={product.id} style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    width: "200px"
                }}>
                <img src={product.image} alt={product.title} style={{ width: "100px", height: "100px", objectFit: "contain" }}  />
                    <h4>{product.title}</h4>
                    <p><strong>${product.price}</strong></p>
                    <button onClick={() => onAddToCart(product)}>Add to Cart</button>
                </div>
            ))}


        </div>
    );
};

export default FetchProduct;