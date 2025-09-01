import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error(err));
    }, [productId]);

    if (!product) return <p>Loading product...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{product.title}</h1>
            <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: '300px', objectFit: 'contain' }}
            />
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p>{product.description}</p>
        </div>
    );
};

export default SingleProductPage;