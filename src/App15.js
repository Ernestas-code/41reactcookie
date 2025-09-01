import React, {useEffect, useState} from 'react';
import FetchProduct from "./components/Fetch{Product";
import ShoppingCart from "./components/ShoppingCart";
const App15 = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => {
                console.log(data);
               setProducts(data);
            })
    }, []);
    const addToCart = (product) => {
        if (!cartItems.find(item => item.id === product.id)) {
            setCartItems([...cartItems, product]);
        }
    }
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    }
    return (<div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '20px'
        }}>
            <div style={{ flex: 1 }}>
                <h1> Products</h1>
                <FetchProduct products={products} onAddToCart={addToCart} />
            </div>

            <div style={{
                width: '300px',
                marginLeft: '30px',
                position: 'sticky',
                top: '20px',
                alignSelf: 'flex-start',
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
                <h2>Shopping Cart</h2>
                <ShoppingCart cartItems={cartItems} onRemove={removeFromCart} />
            </div>
        </div>
    );
};

export default App15;