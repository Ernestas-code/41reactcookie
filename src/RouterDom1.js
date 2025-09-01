import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage1 from "./RouterDomTask/ProductsPage1";
import SingleProductPageZustand from "./components/SingleProductPageZustand";
import CartItem from "./components/CartItem";
import Toolbar2 from "./components/Toolbar2";
const RouterDom1 = () => {
    return (
        <Router>
            <Toolbar2 />
            <Routes>
                <Route path="/" element={<ProductsPage1 />} />
                <Route path="/product/:productId" element={<SingleProductPageZustand />} />
                <Route path="/cart" element={<CartItem />} />
            </Routes>
        </Router>
    );
};

export default RouterDom1;