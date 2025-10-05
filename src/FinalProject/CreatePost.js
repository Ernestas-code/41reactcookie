import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const CreatePost = ({ token}) => {

    const [topic, setTopic] = useState("");
    const [mood, setMood] = useState("Happy");
    const [image, setImage] = useState("");
    const [createdPost, setCreatedPost] = useState(null);
    const navigate = useNavigate();

    const moods = [
        { label: "Happy", emoji: "😊" },
        { label: "Sad", emoji: "😢" },
        { label: "Excited", emoji: "🤩" },
        { label: "Angry", emoji: "😡" },
    ];

    const handleSubmit = async () => {
        if (!topic) return alert("Please enter topic");
        const res = await fetch("http://localhost:2500/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({topic, mood, image}),
        })
        const data = await res.json();
        setCreatedPost(data)
        console.log(data)
        setTopic("");
        setImage("");
    }

    return (
        <div style={{
            maxWidth: "600px",
            margin: "40px auto",
            padding: "30px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    padding: "10px 18px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginBottom: "20px",
                    fontWeight: "500",
                }}
            >
                ← Back
            </button>

            <h2 style={{
                marginBottom: "20px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333"
            }}>
                Create New Post
            </h2>

            <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "16px"
                }}
            />

            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold", marginBottom: "10px", display: "block" }}>
                    Pick a mood:
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                    {moods.map(m => (
                        <button
                            key={m.label}
                            onClick={() => setMood(m.label)}
                            style={{
                                flex: 1,
                                padding: "12px",
                                borderRadius: "8px",
                                fontSize: "20px",
                                border: mood === m.label ? "2px solid #007bff" : "1px solid #ccc",
                                backgroundColor: mood === m.label ? "#e7f1ff" : "white",
                                cursor: "pointer",
                                transition: "0.2s"
                            }}
                        >
                            {m.emoji} <div style={{ fontSize: "12px" }}>{m.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={e => setImage(e.target.value)}
                style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "16px"
                }}
            />

            <button
                onClick={handleSubmit}
                style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
            >
                Create Post
            </button>

            {createdPost && (
                <div style={{
                    marginTop: "30px",
                    padding: "20px",
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fa"
                }}>
                    <h3 style={{ marginBottom: "10px" }}> Post Created!</h3>
                    <p>{createdPost.content}</p>
                </div>
            )}
        </div>
    );
};

export default CreatePost;