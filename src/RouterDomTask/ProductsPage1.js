import React, { useEffect } from "react";
import { useProductStore } from "../Store/Store1";
import { Link } from "react-router-dom";

const ProductsPage1 = () => {
    const products = useProductStore((state) => state.products);
    const fetchProducts = useProductStore((state) => state.fetchProducts);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Products</h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                            background: "#fff",
                        }}
                    >
                        <Link
                            to={`/product/${product.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{
                                    maxWidth: "120px",
                                    maxHeight: "120px",
                                    objectFit: "contain",
                                    marginBottom: "10px",
                                }}
                            />
                            <h3 style={{ fontSize: "1rem", margin: "10px 0" }}>
                                {product.title}
                            </h3>
                            <p>
                                <strong>${product.price.toFixed(2)}</strong>
                            </p>
                            <p style={{ fontSize: "0.85rem", color: "#666" }}>
                                {product.category}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage1;