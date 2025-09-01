import React, { useEffect, useState } from "react";

const PostList = ({ onAddFavorite = () => {}, favorites = [] }) => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const res = await fetch("http://156.67.83.41:1111/getallposts");
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                const data = await res.json();
                console.log("Fetched posts data:", data);
                if (!active) return;
                if (data.success) setPosts(data.data);
                else throw new Error("API returned success = false");
            } catch (err) {
                if (active) setError(err.message);
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, []);

    const handlePostClick = (post) => setSelectedPost(post);
    const handleBackClick = () => setSelectedPost(null);

    const isFav = (id) => favorites.some((f) => f.id === id);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    if (selectedPost) {
        const alreadyFav = isFav(selectedPost.id);
        return (
            <div style={{ maxWidth: 600, margin: "auto", padding: 10 }}>
                <button onClick={handleBackClick} style={{ marginBottom: 20 }}>
                    Back to all posts
                </button>
                <h2 style={{ marginTop: 0 }}>{selectedPost.title}</h2>
                <p><strong>By:</strong> {selectedPost.username}</p>
                {selectedPost.image && (
                    <img src={selectedPost.image} alt={selectedPost.title} style={{ maxWidth: "100%" }} />
                )}
                <p>{selectedPost.description}</p>
                <small>{new Date(selectedPost.timestamp).toLocaleString()}</small>
                <br />
                <button
                    onClick={() => onAddFavorite(selectedPost)}
                    disabled={alreadyFav}
                    style={{ marginTop: 10 }}
                    title={alreadyFav ? "Already in favorites" : "Add to favorites"}
                >
                    {alreadyFav ? "In Favorites ✓" : "Add to Favorites"}
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 600, margin: "auto" }}>
            {posts.map((post) => {
                const alreadyFav = isFav(post.id);
                return (
                    <div key={post.id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: 10, borderRadius: 8 }}>
                        <h3
                            style={{ cursor: "pointer", color: "blue", marginTop: 0 }}
                            onClick={() => handlePostClick(post)}
                        >
                            {post.title}
                        </h3>
                        {post.image && (
                            <img src={post.image} alt={post.title} style={{ maxWidth: "100%" }} />
                        )}
                        <p><strong>By:</strong> {post.username}</p>
                        <button
                            onClick={() => onAddFavorite(post)}
                            disabled={alreadyFav}
                            title={alreadyFav ? "Already in favorites" : "Add to favorites"}
                        >
                            {alreadyFav ? "In Favorites ✓" : "Add to Favorites"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default PostList;