import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from '../Store/Store1';

const SingleProductPageZustand = () => {

    const { productId } = useParams();
    const product = useProductStore((state) => state.product);
    const fetchProductById = useProductStore((state) => state.fetchProductById);
    const addToCart = useProductStore((state) => state.addToCart);

    useEffect(() => {
        if (productId) {
            fetchProductById(productId);
        }
    }, [productId, fetchProductById]);


    if (!product) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading product...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>

            <h1>{product.title}</h1>
            <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: '200px', height: '100px', objectFit: 'contain', margin: '20px auto' }}
            />


            <p>
                <strong>Price:</strong> ${product.price?.toFixed(2)}
            </p>
            <p>
                <strong>Category:</strong> {product.category}
            </p>
            <p>{product.description}</p>
            <button
                onClick={() => addToCart(product)}
                style={{
                    marginTop: "15px",
                    padding: "10px 15px",
                    border: "1px solid #333",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Add to Cart 🛒
            </button>
        </div>
    );
};

export default SingleProductPageZustand;