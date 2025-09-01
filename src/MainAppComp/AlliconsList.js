import React, { useState } from 'react';
import EditIcon from "./Editicon";

const AlliconsList = ({ cards, deleteCard, updateCard }) => {
    const [editingCard, setEditingCard] = useState(null);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {cards.length === 0 ? (
                <p>No cards added yet</p>
            ) : (
                cards.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            backgroundColor: card.color || "#ffffff",
                            borderRadius: "6px"
                        }}
                    >
                        <div style={{ fontSize: "40px", marginBottom: "6px" }}>
                            {Array.isArray(card.emojis) ? card.emojis.join(" ") : card.emoji}
                        </div>

                        <h3 style={{ margin: "4px 0" }}>{card.title}</h3>
                        <p style={{ margin: "4px 0" }}>
                            Quantity: {card.quantity}
                        </p>
                        <p style={{ margin: "4px 0", fontSize: "12px", color: "gray" }}>
                            Created at: {card.createdAt}
                        </p>

                        <div style={{ marginTop: "8px" }}>
                            <button
                                onClick={() => deleteCard(card)}
                                style={{
                                    padding: "6px 12px",
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    marginRight: "6px"
                                }}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setEditingCard(card)}
                                style={{
                                    padding: "6px 12px",
                                    background: "blue",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                            >
                                Edit
                            </button>
                        </div>

                        {editingCard === card && (
                            <div style={{ marginTop: "10px" }}>
                                <EditIcon
                                    card={card}
                                    onUpdate={(updatedCard) => {
                                        updateCard(updatedCard);
                                        setEditingCard(null);
                                    }}
                                    onCancel={() => setEditingCard(null)}
                                />
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AlliconsList;