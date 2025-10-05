import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Public = ({ currentUser }) => {
    const [posts, setPosts] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const postsRes = await fetch("http://localhost:2500/api/posts");
            const postsData = await postsRes.json();
            setPosts(postsData);

            const usersRes = await fetch("http://localhost:2500/api/users-public");
            const usersData = await usersRes.json();
            setUsers(usersData);

            setLoading(false);
        };
        fetchData();
    }, []);

    const cardStyle = {
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#FF7A30",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
    };

    if (loading) {
        return <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: "#E9E3DF", minHeight: "100vh", padding: "40px" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <h1 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "10px" }}>
                    Welcome to our CodeAcademy app
                </h1>
                <p style={{ color: "#555", fontSize: "18px" }}>
                    Share thoughts, connect with others, and explore posts.
                </p>

                {!currentUser && (
                    <Link to="/login">
                        <button style={buttonStyle}>Join Our Community</button>
                    </Link>
                )}

                {currentUser && (
                    <div style={{
                        marginTop: "20px",
                        padding: "15px 25px",
                        borderRadius: "10px",
                        backgroundColor: "#465C88",
                        color: "white",
                        fontWeight: "bold",
                        display: "inline-block"
                    }}>
                        👋 Welcome back, {currentUser.username}!
                    </div>
                )}
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "30px",
                maxWidth: "1100px",
                margin: "0 auto"
            }}>
                <div>
                    <h2>Latest Posts ({posts.length})</h2>
                    {posts.length === 0 ? (
                        <p>No posts yet.</p>
                    ) : (
                        posts.slice(0, 5).map((post) => (
                            <div key={post._id} style={{ ...cardStyle, marginBottom: "15px" }}>
                                <h3>{post.topic}</h3>
                                <p style={{ fontSize: "14px", color: "#666" }}>
                                    By <b>{post.username}</b> | {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                                <p>{post.content?.substring(0, 100)}...</p>
                                <Link to={`/post/${post._id}`}>
                                    <button style={{ ...buttonStyle, marginTop: "10px" }}>Read More</button>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
                <div>
                    <h2>Community Members ({users.length})</h2>
                    {users.length === 0 ? (
                        <p>No users yet.</p>
                    ) : (
                        users.slice(0, 6).map((user) => (
                            <Link key={user._id} to={`/user/${user.username}`} style={{ textDecoration: "none" }}>
                                <div style={{ ...cardStyle, marginBottom: "10px" }}>
                                    <b>{user.username}</b>
                                    <p style={{ fontSize: "14px", color: "#666" }}>Community Member</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Public;
