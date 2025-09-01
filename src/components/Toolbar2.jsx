import React from "react";
import { useProductStore } from "../Store/Store1";
import { Link } from "react-router-dom";

const Toolbar2 = () => {
    const cart = useProductStore((state) => state.cart);
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    return (

        <div

            style={{
                padding: "10px 20px",
                background: "#eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >

            <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
                Home
            </Link>
            <Link to="/cart" style={{ textDecoration: "none" }}>
                Cart  ({count})
            </Link>

        </div>
    );
};

export default Toolbar2;