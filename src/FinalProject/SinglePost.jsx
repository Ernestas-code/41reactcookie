import React, {useState, useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
const SinglePost = ({ currentUser, token}) => {
    const [post, setPost] = useState(null);
    const [commentText, setCommentText] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:2500/api/posts/${id}`)
        .then(res => res.json())
        .then(setPost)
            .catch(console.error);
    }, [id])


    const handleComment = async () => {
        if (!commentText) return;
        const res =await fetch(`http://localhost:2500/api/posts/${id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({text: commentText}),
        })
        const updatedPost = await res.json();
        setPost(updatedPost);
        setCommentText("");
    }
    if (!post) return <p>Loading....</p>


    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#E9E3DF",
                padding: "40px",
            }}
        >
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

            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "30px",
                    maxWidth: "800px",
                    margin: "0 auto",
                }}
            >
                <h2
                    style={{
                        color: "#000",
                        marginBottom: "10px",
                        fontSize: "24px",
                        fontWeight: "700",
                    }}
                >
                    {post.topic} <span style={{ fontWeight: "400" }}>({post.mood})</span>
                </h2>
                <p style={{ color: "#465C88", marginBottom: "20px" }}>
                    <b>By:</b> {post.username} | <b>Posted:</b>{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>

                {post.image && (
                    <img
                        src={post.image}
                        alt="Post"
                        style={{
                            width: "95%",
                            maxHeight: "300px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            marginBottom: "20px",
                        }}
                    />
                )}

                <div
                    style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        padding: "20px",
                        marginBottom: "30px",
                        lineHeight: "1.6",
                        color: "#333",
                    }}
                >
                    {post.content}
                </div>

                <h3
                    style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        borderBottom: "2px solid #007bff",
                        paddingBottom: "8px",
                        marginBottom: "20px",
                        color: "#000",
                    }}
                >
                    Comments ({post.comments?.length || 0})
                </h3>

                <div style={{ marginBottom: "30px" }}>
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((c, i) => (
                            <div
                                key={i}
                                style={{
                                    backgroundColor: "#f1f3f4",
                                    padding: "12px",
                                    borderRadius: "10px",
                                    marginBottom: "12px",
                                    borderLeft: "4px solid #007bff",
                                }}
                            >
                                <b>{c.username}:</b> {c.text}
                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#666",
                                        marginTop: "6px",
                                    }}
                                >
                                    {new Date(c.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#666", fontStyle: "italic" }}>
                            No comments yet
                        </p>
                    )}
                </div>

                {currentUser && token && (
                    <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
                        <h4 style={{ marginBottom: "10px", color: "#000" }}>
                            Add a Comment
                        </h4>
                        <textarea
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            style={{
                                width: "100%",
                                minHeight: "80px",
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                resize: "vertical",
                                fontFamily: "inherit",
                                marginBottom: "12px",
                            }}
                        />
                        <button
                            onClick={handleComment}
                            disabled={!commentText.trim()}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: commentText.trim()
                                    ? "#28a745"
                                    : "#ccc",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: commentText.trim()
                                    ? "pointer"
                                    : "not-allowed",
                                fontWeight: "500",
                            }}
                        >
                            Add Comment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SinglePost;