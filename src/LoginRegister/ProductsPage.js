import React, { useEffect, useState } from "react";

const ProductsPage = ({ token, onBack, goToReservations }) => {
    const [products, setProducts] = useState([]);
    const [money, setMoney] = useState(0);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newProduct, setNewProduct] = useState({ title: "", image: "", price: "" });

    useEffect(() => {
        fetchProducts();
        fetchMoney();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:2500/api/products", {
            headers: { Authorization: token }
        });
        const data = await res.json();
        setProducts(data);
    };

    const fetchMoney = async () => {
        const res = await fetch("http://localhost:2500/api/my-money", {
            headers: { Authorization: token },
        });
        const data = await res.json();
        setMoney(data.money);
    };

    const reserveProduct = async (id) => {
        try {
            const res = await fetch(`http://localhost:2500/api/products/${id}/reserve`, {
                method: "POST",
                headers: { Authorization: token },
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error);
                return;
            }
            alert("Reserved!");
            fetchProducts();
            fetchMoney();
        } catch (err) {
            console.error("Reserve failed", err);
        }
    };
    const createProduct = async (e) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.image || !newProduct.price) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await fetch("http://localhost:2500/api/products", {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: newProduct.title,
                    image: newProduct.image,
                    price: parseFloat(newProduct.price)
                })
            });
            const data = await res.json();
            if (res.ok) {
                alert("Product created!");
                setNewProduct({ title: "", image: "", price: "" });
                setShowCreateForm(false);
                fetchProducts();
            } else {
                alert(data.error || "Failed to create product");
            }
        } catch (err) {
            console.error("Create failed", err);
            alert("Create failed");
        }
    };

    return (
        <div>
            <button onClick={onBack}>Back</button>
            <button onClick={goToReservations}>My Reservations</button>
            <button onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? "Cancel" : "Create Product"}
            </button>
            <h2>Money: {money}</h2>

            {showCreateForm && (
                <div style={{ border: "2px solid blue", padding: "15px", margin: "10px 0" }}>
                    <h3>Create New Product</h3>
                    <form onSubmit={createProduct}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newProduct.title}
                            onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                            style={{ margin: "5px", padding: "5px", width: "200px" }}
                        />
                        <input
                            type="url"
                            placeholder="Image URL"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                            style={{ margin: "5px", padding: "5px", width: "200px" }}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            style={{ margin: "5px", padding: "5px", width: "100px" }}
                            step="0.01"
                            min="0"
                        />
                        <button type="submit">Create</button>
                    </form>
                </div>
            )}

            <h2>All Products</h2>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {products.map((p) => (
                    <div key={p._id} style={{ border: "1px solid gray", padding: "10px" }}>
                        <img src={p.image} alt={p.title} width="100" />
                        <h3>{p.title}</h3>
                        <p>Price: {p.price}</p>
                        {p.reservedBy ? (
                            <p style={{ color: "red" }}>Reserved</p>
                        ) : (
                            <button onClick={() => reserveProduct(p._id)}>Reserve</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;