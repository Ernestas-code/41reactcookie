import React from "react";
import { useProductStore } from "../Store/Store1";

const CartItem = () => {
    const cart = useProductStore((state) => state.cart);
    const removeFromCart = useProductStore((state) => state.removeFromCart);

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    return (
        <div style={{ padding: "20px" }}>
            <h2><strong>Cart</strong></h2>
            {cart.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                borderBottom: "1px solid #ddd",
                                padding: "10px 0",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <p>
                                    <strong>{item.title}</strong>
                                </p>
                                <p>
                                    ${item.price.toFixed(2)} x {item.qty}
                                </p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                style={{
                                    padding: "5px 10px",
                                    border: "1px solid red",
                                    background: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                 Remove
                            </button>
                        </div>
                    ))}

                    <h3 style={{ marginTop: "15px" }}>
                        Total: ${totalPrice.toFixed(2)}
                    </h3>
                </div>
            )}
        </div>
    );
};

export default CartItem;