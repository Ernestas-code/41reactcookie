import React, { useEffect, useState } from "react";

const PageLike = ({ currentUser, userId, onLogout, onCreatePost }) => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "", image: "" });
    const [commentInputs, setCommentInputs] = useState({});
    const [likedPosts, setLikedPosts] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("http://localhost:2500/api");
            const data = await res.json();

            const normalized = data.map(post => ({
                ...post,
                isLiked: post.likes.includes(currentUser)
            }));

            setPosts(normalized);

            const likesMap = {};
            data.forEach(post => {
                likesMap[post._id] = post.likes.includes(currentUser);
            });
            setLikedPosts(likesMap);
        };
        fetchPosts();
    }, [currentUser]);

    const handleLike = async (postId) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:2500/api/posts/${postId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                }
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Failed to like post");
                return;
            }

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? { ...post, likes: data.likes, isLiked: data.likedByUser }
                        : post
                )
            );
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };
    const handleCommentChange =  (postId,value) => {
        setCommentInputs(prev=> ({...prev, [postId]: value}));
    }
    const handleCommentSubmit = async (e,postId) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return alert("log in to comment");
        const value = commentInputs[postId];
        if (!value || value.trim() ==="") return ;
        try {
            const res = await fetch(`http://localhost:2500/api/posts/${postId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({value}),
            })
            const data = await res.json();
            if (!res.ok) {
                alert(data.error);
                return;
            }
            setPosts(prev=>
            prev.map((post) =>
            post._id===postId? {...post, comments:data.comments }
            : post
            )
            );
            setCommentInputs(prev=>({...prev,[postId]: ""}))



        }
        catch (err) {
            console.error("Error adding comment:", err);
        }



    }



    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Welcome, {currentUser}!</h2>
                <div>
                    <button onClick={onCreatePost}>Create Post</button>
                    <button onClick={onLogout} style={{ marginLeft: "10px" }}>Logout</button>
                </div>
            </div>

            {posts.length === 0 ? (
                <p>No posts available. Create one!</p>
            ) : (
                posts.map(post => (
                    <div
                        key={post._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            margin: "10px 0",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h4>{post.title}</h4>
                        {post.image && <img src={post.image} alt={post.title} style={{ maxWidth: "200px" }} />}
                        <p>{post.description}</p>
                        <p><b>Owner:</b> {post.owner}</p>



                        <p>Likes: {post.likes.length}</p>
                        <button onClick={() => handleLike(post._id)}>
                            {likedPosts[post._id] ? "Unlike" : "Like"}
                        </button>

                        {post.owner === currentUser && (
                            <button
                                onClick={() => {
                                    // handle edit logic
                                }}
                                style={{ marginLeft: "10px" }}
                            >
                                Edit
                            </button>
                        )}



                        <div style={{ marginTop: "10px" }}>
                            <h5>Comments:</h5>
                            {post.comments && post.comments.length > 0 ? (
                                post.comments.map((c, i) => (
                                    <div key={i} style={{ marginBottom: "5px" }}>
                                        <b>{c.username}</b> ({new Date(c.time).toLocaleString()}): {c.value}
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet</p>
                            )}

                            <form onSubmit={(e) => handleCommentSubmit(e, post._id)} style={{ marginTop: "5px" }}>
                                <input
                                    type="text"
                                    value={commentInputs[post._id] || ""}
                                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                    placeholder="Write a comment..."
                                    required
                                    style={{ width: "70%", marginRight: "5px" }}
                                />
                                <button type="submit">Comment</button>
                            </form>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default PageLike;