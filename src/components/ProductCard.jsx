import React from 'react';
import { Link } from 'react-router-dom';
const ProductCard = ({ id, image, title, price, category }) => {
    return (
        <Link
            to={`/ProductPage/product/${id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}>
            <img
                src={image}
                alt={title}
                style={{ maxWidth: '100%', height: '100px', objectFit: 'contain' }}
            />
            <h3 style={{ fontSize: '1rem', margin: '10px 0' }}>{title}</h3>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>${price.toFixed(2)}</p>
            <p style={{ fontStyle: 'italic', color: '#555' }}>{category}</p>
        </div>
        </Link>
    );
};

export default ProductCard;