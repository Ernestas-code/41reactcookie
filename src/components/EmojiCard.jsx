import React from "react";

function EmojiCard(props) {
    return (
        <div
            style={{
                backgroundColor: props.color,
                padding: 20,
                borderRadius: 8,
                width: 220,
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                position: "relative",
            }}
        >
            <div style={{ fontSize: 48, marginBottom: 10 }}>
                {props.emojis.map((e, i) => (
                    <span key={i} style={{ marginRight: 5 }}>
            {e}
          </span>
                ))}
            </div>

            <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
                {props.text}
            </div>

            <div style={{ fontSize: 12, color: "#555", fontStyle: "italic" }}>
                Created at: {props.createdAt}
            </div>

            <button
                onClick={props.onRemove}
                style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: 5,
                    color: "black",
                    cursor: "pointer",
                    padding: "5px 10px",
                    fontWeight: "bold",
                }}
            >
                Del
            </button>
        </div>
    );
}

export default EmojiCard;