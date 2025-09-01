import React, { useEffect, useState } from 'react';

const AppCode3 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://hp-api.onrender.com/api/characters')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                console.log(data);
            });
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                padding: '20px'
            }}
        >
            {products.map((product) => (
                <div
                    key={product.name + product.actor}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        width: '200px',
                        textAlign: 'center'
                    }}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'contain'
                        }}
                    />
                    <h4>{product.actor}</h4>
                    <p><strong>{product.name}</strong></p>
                </div>
            ))}
        </div>
    );
};

export default AppCode3;