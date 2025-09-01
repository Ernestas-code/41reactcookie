import React from 'react';

const Deletedicons = ({ deletedCards, restoreCard }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {deletedCards.length === 0 ? (
                <p>No cards have been deleted.</p>
            ) : (
                deletedCards.map((card, index) => (
                    <div key={index} style={{ border: "1px solid gray", padding: "10px" }}>
                        <span style={{ fontSize: "24px" }}>{card.emoji}</span>
                        <div style={{ fontSize: "40px", marginBottom: "6px" }}>
                            {Array.isArray(card.emojis) ? card.emojis.join(" ") : card.emoji}
                        </div>
                        <h3>{card.title}</h3>
                        <p>Quantity: {card.quantity}</p>
                        <p>Deleted at: {card.createdAt}</p>
                        <button
                            onClick={() => restoreCard(card)}
                            style={{ padding: "6px 12px", background: "blue", color: "white", border: "none", cursor: "pointer" }}
                        >
                            Restore
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Deletedicons;