import React, { useState } from 'react';

const EditIcon = ({ card, onUpdate, onCancel }) => {
    const [title, setTitle] = useState(card.title);
    const [quantity, setQuantity] = useState(card.quantity);
    const [color, setColor] = useState(card.color || "#ffffff");
    const [emojis, setEmojis] = useState(Array.isArray(card.emojis) ? card.emojis : []);

    const emojiList = ['😎', '🤬', '👄', '❤', '☢', '🐾', '🐱‍👤', '🐣', '😀'];

    const toggleEmoji = (selectedEmoji) => {
        setEmojis(prev =>
            prev.includes(selectedEmoji)
                ? prev.filter(e => e !== selectedEmoji)
                : [...prev, selectedEmoji]
        );
    };

    const handleUpdate = () => {
        onUpdate({ ...card, title, quantity, color, emojis });
    };

    return (
        <div style={{ border: "1px solid gray", padding: "10px", marginTop: "10px" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
                {emojiList.map((e) => (
                    <button
                        key={e}
                        onClick={() => toggleEmoji(e)}
                        style={{
                            fontSize: "20px",
                            padding: "6px",
                            border: emojis.includes(e) ? "2px solid blue" : "1px solid gray",
                            background: "white",
                            cursor: "pointer"
                        }}
                    >
                        {e}
                    </button>
                ))}
            </div>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: "6px", marginBottom: "6px", display: "block", width: "100%" }}
            />

            <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                style={{ padding: "6px", marginBottom: "6px", display: "block", width: "100%" }}
            />

            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ marginBottom: "10px", display: "block" }}
            />

            <button
                onClick={handleUpdate}
                style={{ padding: "6px 12px", background: "green", color: "white", border: "none", marginRight: "6px" }}
            >
                Update
            </button>
            <button
                onClick={onCancel}
                style={{ padding: "6px 12px", background: "gray", color: "white", border: "none" }}
            >
                Cancel
            </button>
        </div>
    );
};

export default EditIcon;