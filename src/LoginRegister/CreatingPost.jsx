import React, { useState } from "react";

const CreatingPost = ({ userId, onBack }) => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleCreate = async (e) => {
        const token =localStorage.getItem("token")
        e.preventDefault();
        setError("");

        if (title.length < 5 || title.length > 50) {
            setError("Title must be between 5 and 50 characters.");
            return;
        }

        if (!image.startsWith("http://") && !image.startsWith("https://")) {
            setError("Image URL must start with http:// or https://");
            return;
        }

        try {
            const response = await fetch("http://localhost:2500/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                "Authorization": token,
                },
                body: JSON.stringify({
                    title,
                    image,
                    description: description || "",
                    user_id: userId,
                }),
            });




            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Something went wrong.");
                return;
            }

            console.log("Post created:", data.post);

            setTitle("");
            setImage("");
            setDescription("");
            onBack(true);
        } catch (err) {
            console.error("Error creating post:", err);
            setError("Server error. Try again later.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Create Post</h2>
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: "100%", height: "80px", marginTop: "10px" }}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Add Post</button>
            </form>
            <button onClick={() => onBack(false)} style={{ marginTop: "10px" }}>
                Back
            </button>
        </div>
    );
};

export default CreatingPost;