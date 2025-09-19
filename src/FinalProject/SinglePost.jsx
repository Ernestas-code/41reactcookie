import React, {useState, useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
const SinglePost = ({postId, currentUser, token}) => {
    const [post, setPost] = useState({});
    const [commentText, setCommentText] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:2500/api/posts/${postId}`)
        .then(res => res.json())
        .then(setPost)
            .catch(console.error);
    }, [postId])

    const handleComment = async () => {
        if (!commentText) return;
        const res =await fetch(`http://localhost:2500/api/posts/${postId}/comment`, {
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
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    padding: "8px 16px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                    marginBottom: "20px"
                }}
            >
                ← Back
            </button>

            <div style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff"
            }}>
                <h2 style={{ color: "#333" }}>
                    {post.topic} ({post.mood})
                </h2>
                <p style={{ color: "#666", marginBottom: "15px" }}>
                    <b>By:</b> {post.username} |
                    <b> Posted:</b> {new Date(post.createdAt).toLocaleDateString()}
                </p>

                {post.image && (
                    <img
                        src={post.image}
                        alt="Post"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            marginBottom: "15px",
                            borderRadius: "5px"
                        }}
                    />
                )}

                <div style={{
                    padding: "15px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    lineHeight: "1.6"
                }}>
                    {post.content}
                </div>

                <h3 style={{ borderBottom: "2px solid #007bff", paddingBottom: "10px" }}>
                    Comments ({post.comments?.length || 0})
                </h3>

                <div style={{ marginBottom: "20px" }}>
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((c, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: "10px",
                                    margin: "10px 0",
                                    backgroundColor: "#f1f3f4",
                                    borderLeft: "3px solid #007bff",
                                    borderRadius: "0 5px 5px 0"
                                }}
                            >
                                <b>{c.username}:</b> {c.text}
                                <div style={{ fontSize: "0.8em", color: "#666", marginTop: "5px" }}>
                                    {new Date(c.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#666", fontStyle: "italic" }}>No comments yet</p>
                    )}
                </div>

                {currentUser && token && (
                    <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
                        <h4>Add a Comment</h4>
                        <textarea
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            style={{
                                width: "100%",
                                minHeight: "80px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                resize: "vertical",
                                fontFamily: "inherit"
                            }}
                        />
                        <button
                            onClick={handleComment}
                            disabled={!commentText.trim()}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: commentText.trim() ? "#28a745" : "#ccc",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: commentText.trim() ? "pointer" : "not-allowed",
                                marginTop: "10px"
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