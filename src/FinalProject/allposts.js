import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

const Allposts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("http://localhost:2500/api/posts/")
            const postData = await res.json();
            setPosts(postData);
        }
        fetchPosts();
    },[])
    return (
        <div style={{ padding: "20px" }}>
            <h2>All Posts ({posts.length})</h2>

            {posts.length === 0 ? (
                <p>No posts found</p>
            ) : (
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    {posts.map((post) => (
                        <div key={post._id} style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            margin: "15px 0",
                            borderRadius: "8px",
                            backgroundColor: "#f9f9f9"
                        }}>
                            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                                {post.topic}
                            </h3>

                            <div style={{ marginBottom: "10px", color: "#666" }}>
                                <span><b>Mood:</b> {post.mood}</span> |
                                <span><b> By:</b> {post.username}</span> |
                                <span><b> Posted:</b> {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>

                            {post.image && (
                                <img
                                    src={post.image}
                                    alt="Post"
                                    style={{
                                        maxWidth: "300px",
                                        height: "auto",
                                        display: "block",
                                        margin: "10px 0",
                                        borderRadius: "5px"
                                    }}
                                />
                            )}

                            <p style={{ margin: "10px 0", lineHeight: "1.5" }}>
                                {post.content?.substring(0, 200)}
                                {post.content?.length > 200 && "..."}
                            </p>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "15px"
                            }}>
                                <small style={{ color: "#666" }}>
                                    Comments: {post.comments?.length || 0}
                                </small>

                                <Link to={`/post/${post._id}`}>
                                    <button style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: "pointer"
                                    }}>
                                        View Full Post
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Allposts;