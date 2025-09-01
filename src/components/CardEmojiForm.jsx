import React, { useState } from "react";

const emojisList = ["🍕", "🍟", "🍔","🌯", "🍗"];

function CardEmojiForm(props) {
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [color, setColor] = useState("#ffffff");
    const [text, setText] = useState("");

    function toggleEmoji(emoji) {
        if (selectedEmojis.includes(emoji)) {
            setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
        } else {
            setSelectedEmojis([...selectedEmojis, emoji]);
        }
    }

    function handleSubmit() {
        if (selectedEmojis.length === 0) {
            alert("Select at least one emoji.");
            return;
        }
        props.onAdd({ emojis: selectedEmojis, color, text });
        setSelectedEmojis([]);
        setColor("#ffffff");
        setText("");
    }

    return (
        <div style={{ border: "1px solid #ccc", padding: 20, width: 300, borderRadius: 8 }}>
            <div>
                <strong>Select Emojis:</strong>
                <div style={{ margin: "10px 0" }}>
                    {emojisList.map((emoji) => (
                        <button
                            key={emoji}
                            onClick={() => toggleEmoji(emoji)}
                            style={{
                                fontSize: 24,
                                marginRight: 10,
                                backgroundColor: selectedEmojis.includes(emoji) ? "#add8e6" : "#eee",
                                border: "none",
                                cursor: "pointer",
                                padding: "5px 10px",
                            }}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label>
                    Color:{" "}
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ cursor: "pointer" }}
                    />
                </label>
            </div>

            <div style={{ marginTop: 10 }}>
                <label>
                    Text:{" "}
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ width: "100%", padding: 5 }}
                        placeholder="Enter card text"
                    />
                </label>
            </div>

            <button
                onClick={handleSubmit}
                style={{
                    marginTop: 15,
                    width: "100%",
                    padding: 10,
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: 5,
                    cursor: "pointer",
                }}
            >
                Add Card
            </button>
        </div>
    );
}

export default CardEmojiForm;