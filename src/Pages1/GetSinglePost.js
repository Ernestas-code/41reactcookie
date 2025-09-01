import React, { useState, useEffect } from "react";

const GetSinglePost = ({ username, postId }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("GetSinglePost props:", { username, postId });
        if (!username || !postId) {
            setPost(null);
            return;
        }
        setLoading(true);
        setError("");
        fetch(`http://156.67.83.41:1111/getsinglepost/${username}/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPost(data.data);
                } else {
                    setPost(null);
                    setError("Post not found.");
                }
            })
            .catch((err) => {
                setPost(null);
                setError("Error fetching post.");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [username, postId]);

    if (!username) return <p>Please login to view the post.</p>;
    if (!postId) return <p>Please enter a Post ID.</p>;
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!post) return <p>No post to display.</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>
                <strong>By:</strong> {post.username}
            </p>
            <img src={post.image} alt={post.title} width="200" />
            <p>{post.description}</p>
            <small>{new Date(post.timestamp).toLocaleString()}</small>
        </div>
    );
};

export default GetSinglePost;