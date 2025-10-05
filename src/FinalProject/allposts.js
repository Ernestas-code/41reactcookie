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
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#E9E3DF",
                padding: "40px",
            }}
        >
            <h1
                style={{
                    color: "#000",
                    marginBottom: "30px",
                    fontSize: "28px",
                    fontWeight: "700",
                }}
            >
                All Posts ({posts.length})
            </h1>

            {posts.length === 0 ? (
                <p>No posts found</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gap: "20px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    }}
                >
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            style={{
                                padding: "20px",
                                backgroundColor: "white",
                                borderRadius: "16px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "scale(1.02)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                            }
                        >
                            <h3
                                style={{
                                    margin: "0 0 10px 0",
                                    color: "#000",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}
                            >
                                {post.topic}
                            </h3>

                            <div
                                style={{
                                    marginBottom: "12px",
                                    color: "#465C88",
                                    fontSize: "14px",
                                }}
                            >
                                <span>
                                    <b>Mood:</b> {post.mood}
                                </span>{" "}
                                |{" "}
                                <span>
                                    <b>By:</b> {post.username}
                                </span>{" "}
                                |{" "}
                                <span>
                                    <b>Posted:</b>{" "}
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            {post.image && (
                                <img
                                    src={post.image}
                                    alt="Post"
                                    style={{
                                        width: "100%",
                                        maxHeight: "450px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                        marginBottom: "12px",
                                    }}
                                />
                            )}

                            <p
                                style={{
                                    margin: "10px 0",
                                    lineHeight: "1.6",
                                    color: "#333",
                                }}
                            >
                                {post.content?.substring(0, 200)}
                                {post.content?.length > 200 && "..."}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: "15px",
                                }}
                            >
                                <small style={{ color: "#465C88" }}>
                                    Comments: {post.comments?.length || 0}
                                </small>

                                <Link to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
                                    <button
                                        style={{
                                            padding: "10px 18px",
                                            backgroundColor: "#007bff",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            fontWeight: "500",
                                        }}
                                    >
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