import React, { useState } from 'react';

const AddIcon = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [emojis, setEmojis] = useState([]);
    const [color, setColor] = useState('#ffffff');

    const emojiList = ['😎', '🤬', '👄', '❤', '☢', '🐾', '🐱‍👤', '🐣', '😀'];
    const handleEmojiClick = (selectedEmoji) => {
        setEmojis(prev =>
            prev.includes(selectedEmoji)
                ? prev.filter(e => e !== selectedEmoji) // remove if already selected
                : [...prev, selectedEmoji] // add if not
        );
    };
    const handleAdd = () => {
        if (title.trim() === '') return;
        onAdd({ title, quantity, emojis, color });
        setTitle('');
        setQuantity(1);
        setEmojis([]);
        setColor('#ffffff');
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", gap: "6px" }}>
                {emojiList.map((e) => (
                    <button
                        key={e}
                        onClick={() => handleEmojiClick(e)}
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
                placeholder="Enter card title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: "6px", border: "1px solid gray" }}
            />

            <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                style={{ padding: "6px", border: "1px solid gray" }}
            />

            <label style={{ fontSize: "14px" }}>Background Color:</label>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: "50px", height: "30px", padding: 0, border: "none" }}
            />

            <button
                onClick={handleAdd}
                style={{ padding: "8px", background: "green", color: "white", border: "none", cursor: "pointer" }}
            >
                Add Card
            </button>
        </div>
    );
};

export default AddIcon;