import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
const Public = () => {
    const [posts, setPosts] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const postsRes = await fetch("http://localhost:2500/api/posts");
            const postsData = await postsRes.json();
            setPosts(postsData);
            const usersRes = await fetch("http://localhost:2500/api/users-public");
            const usersData = await usersRes.json();
            setUsers(usersData);
        }
        fetchData();
    },[])

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h1>Welcome to Our Social App</h1>
                <p>Browse posts and users, or login to join the conversation!</p>
            </div>

            <div style={{ display: "flex", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ flex: 1 }}>
                    <h2>Recent Posts ({posts.length})</h2>
                    {posts.length === 0 ? (
                        <p>No posts yet</p>
                    ) : (
                        <div>
                            {posts.slice(0, 5).map((post) => (
                                <div key={post._id} style={{
                                    border: "1px solid #ccc",
                                    padding: "15px",
                                    margin: "10px 0",
                                    borderRadius: "5px",
                                    backgroundColor: "#f9f9f9"
                                }}>
                                    <h3>{post.topic}</h3>
                                    <p><b>Mood:</b> {post.mood} | <b>By:</b> {post.username}</p>
                                    <p>{post.content?.substring(0, 100)}...</p>
                                    <Link to={`/post/${post._id}`}>
                                        <button style={{
                                            padding: "5px 10px",
                                            backgroundColor: "#007bff",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "3px",
                                            cursor: "pointer"
                                        }}>
                                            Read More
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <h2>Our Users ({users.length})</h2>
                    {users.length === 0 ? (
                        <p>No users yet</p>
                    ) : (
                        <div>
                            {users.slice(0, 10).map((user) => (
                                <div key={user._id} style={{
                                    padding: "10px",
                                    margin: "5px 0",
                                    border: "1px solid #ddd",
                                    borderRadius: "3px",
                                    backgroundColor: "white"
                                }}>
                                    <Link to={`/user/${user.username}`} style={{
                                        color: "blue",
                                        textDecoration: "none"
                                    }}>
                                        {user.username}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Public;