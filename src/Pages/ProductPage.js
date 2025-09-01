import React, { useState, useEffect } from 'react';
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Error fetching products:', err));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Products</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '20px',
                marginTop: '20px',
            }}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        category={product.category}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductPage;