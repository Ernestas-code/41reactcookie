import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import SinglePost from "./SinglePost";
import CreatePost from "./CreatePost";
import SingleUser from "./SingleUser";

const PublicIndexPage = ({ onLogin, onSelectPost, onSelectUser }) => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsRes = await fetch("http://localhost:2500/api/posts");
                const postsData = await postsRes.json();
                setPosts(postsData);
                console.log(postsData.length);
                const usersRes = await fetch("http://localhost:2500/api/users-public");
                const usersData = await usersRes.json();
                setUsers(usersData);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h1>Welcome to Our Social App</h1>
                <button
                    onClick={onLogin}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "10px"
                    }}
                >
                    Login / Register
                </button>
            </div>

            <div style={{ display: "flex", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ flex: 1 }}>
                    <h2>Recent Posts ({posts.length})</h2>
                    {posts.length === 0 ? (
                        <p>No posts yet</p>
                    ) : (
                        <div>
                            {posts.slice(0, 5).map((p) => (
                                <div key={p._id} style={{
                                    border: "1px solid #ccc",
                                    padding: "15px",
                                    margin: "10px 0",
                                    borderRadius: "5px",
                                    backgroundColor: "#f9f9f9"
                                }}>
                                    <h3>{p.topic}</h3>
                                    <p><b>Mood:</b> {p.mood} | <b>By:</b> {p.username}</p>
                                    <p>{p.content?.substring(0, 100)}...</p>
                                    <button
                                        onClick={() => onSelectPost(p._id)}
                                        style={{
                                            padding: "5px 10px",
                                            backgroundColor: "#28a745",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "3px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Read More
                                    </button>
                                </div>
                            ))}
                            {posts.length > 5 && (
                                <p style={{ textAlign: "center", color: "#666" }}>
                                    ... and {posts.length - 5} more posts
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <h2>Our Users ({users.length})</h2>
                    {users.length === 0 ? (
                        <p>No users yet</p>
                    ) : (
                        <div>
                            {users.slice(0, 10).map((u) => (
                                <div key={u._id} style={{
                                    padding: "10px",
                                    margin: "5px 0",
                                    border: "1px solid #ddd",
                                    borderRadius: "3px",
                                    backgroundColor: "white"
                                }}>
                                    <span
                                        onClick={() => onSelectUser(u.username)}
                                        style={{
                                            cursor: "pointer",
                                            color: "blue",
                                            textDecoration: "underline"
                                        }}
                                    >
                                        {u.username}
                                    </span>
                                </div>
                            ))}
                            {users.length > 10 && (
                                <p style={{ color: "#666" }}>
                                    ... and {users.length - 10} more users
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const UsersPage = ({ token, onBack, onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
             const res = await fetch("http://localhost:2500/api/users", {
                headers: {Authorization: `Bearer ${token}`},
            })
               const userData = await res.json()
            setUsers(userData)
            console.log(userData)
            setLoading(false);
        }
        fetchUsers();
    }, [token]);
    if (loading) return <div><p>Loading users...</p><button onClick={onBack}>Back</button></div>;

    return (
        <div>
            <button onClick={onBack}>⬅ Back</button>
            <h2>All Users</h2>
            <ul>
                {users.map((u) => (
                    <li key={u._id} style={{ marginBottom: "10px" }}>
                        <span
                            onClick={() => onSelectUser(u.username)}
                            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                        >
                            {u.username}
                        </span> ({u.email})
                    </li>
                ))}
            </ul>
            <button onClick={onBack}>Back</button>
        </div>
    );
};

const PostsPage = ({ onBack,onSelectPost }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2500/api/posts")
            .then((res) => res.json())
            .then(setPosts)
            .catch((err) => console.error(err));

    }, []);

    return (
        <div>
            <button onClick={onBack}>⬅ Back</button>
            <h2>All Posts</h2>
            {posts.length === 0 ? (
                <p>No posts found</p>
            ) : (
                <div>
                    {posts.map((p) => (
                        <div key={p._id} style={{
                            border: "1px solid #ccc",
                            padding: "15px",
                            margin: "10px 0",
                            borderRadius: "5px",
                            backgroundColor: "#f9f9f9"
                        }}>
                            <h3>{p.topic}</h3>
                            <p><b>Mood:</b> {p.mood} | <b>By:</b> {p.username}</p>
                            {p.image && <img src={p.image} alt="Post" style={{ maxWidth: "200px", display: "block", margin: "10px 0" }} />}
                            <p>{p.content?.substring(0, 150)}...</p>
                            <p><small>Comments: {p.comments?.length || 0}</small></p>
                            <button
                                onClick={() => onSelectPost(p._id)}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "3px",
                                    cursor: "pointer"
                                }}
                            >
                                View Full Post
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={onBack} style={{ marginTop: "20px", padding: "10px 20px" }}>Back to Menu</button>
        </div>
    );
};

const ProfilePage = ({ currentUser, onBack, token, onUpdateUser}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(currentUser.username);
    const [pokes, setPokes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updateError, setUpdateError] = useState("");

    useEffect(() => {
        const fetchPokes = async () => {
            const res = await fetch("http://localhost:2500/api/pokes", {
                headers: {Authorization: `Bearer ${token}`},
            })
            const pokesData = await res.json()
            setPokes(pokesData)
            setLoading(false)
        }
        fetchPokes();
    }, [token])

    const handleUpdateUsername = async () => {
        if (!newUsername.trim() || newUsername === currentUser.username) {
            setIsEditing(false);
            setNewUsername(currentUser.username);
            return;
        }
        try {
            setUpdateError("");
            const res = await fetch("http://localhost:2500/api/update-username", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username: newUsername.trim() }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to update username');
            }

            const data = await res.json();
            onUpdateUser({ ...currentUser, username: newUsername.trim() });
            setIsEditing(false);
            alert("Username updated successfully!");
        } catch (err) {
            setUpdateError(err.message);
            console.error(err);
        }
    };
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer"
                    }}
                >
                    ← Back to Menu
                </button>
            </div>

            <div style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                marginBottom: "20px"
            }}>
                <h2 style={{ color: "#333", marginBottom: "20px" }}>My Profile (Private)</h2>

                <div style={{ marginBottom: "20px" }}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Username:
                        </label>
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    style={{
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                        borderRadius: "3px",
                                        marginRight: "10px",
                                        width: "200px"
                                    }}
                                    placeholder="Enter new username"
                                />
                                <button
                                    onClick={handleUpdateUsername}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        marginRight: "5px"
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setNewUsername(currentUser.username);
                                        setUpdateError("");
                                    }}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#dc3545",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Cancel
                                </button>
                                {updateError && (
                                    <p style={{ color: "red", margin: "5px 0" }}>{updateError}</p>
                                )}
                            </div>
                        ) : (
                            <div>
                                <span style={{ marginRight: "10px" }}>{currentUser.username}</span>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        fontSize: "12px"
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Email:
                        </label>
                        <span>{currentUser.email}</span>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            User ID:
                        </label>
                        <span style={{ color: "#666", fontSize: "0.9em" }}>{currentUser.userId}</span>
                    </div>
                </div>
            </div>

            <div style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff"
            }}>
                <h3 style={{ color: "#333", marginBottom: "15px", borderBottom: "2px solid #007bff", paddingBottom: "10px" }}>
                    Poke History ({pokes.length})
                </h3>

                {loading ? (
                    <p>Loading poke history...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>Error loading pokes: {error}</p>
                ) : pokes.length === 0 ? (
                    <p style={{ color: "#666", fontStyle: "italic" }}>No one has poked you yet!</p>
                ) : (
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                            <tr style={{ backgroundColor: "#f8f9fa" }}>
                                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>
                                    Who Poked You
                                </th>
                                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>
                                    When
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {pokes
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map((poke, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                            <strong>{poke.fromUser}</strong>
                                        </td>
                                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                            {new Date(poke.date).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};



const App = ({}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [view, setView] = useState("index");
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedUsername, setSelectedUsername] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("currentUser");

        if (savedToken && savedUser) {
            try {
                setToken(savedToken);
                setCurrentUser(JSON.parse(savedUser));
            } catch (err) {
                console.error("Failed to parse saved user data");
                localStorage.removeItem("token");
                localStorage.removeItem("currentUser");
            }
        }
    }, []);

    const handleLogin = (data) => {
        console.log(data.username);
        setCurrentUser(data);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data));
        setView("menu");
    };
    const handleLogout = () => {
        setCurrentUser(null);
        setToken("");
        setView("index");
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
    };
    const handleUpdateUser = (updatedUser) => {
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    };

    if (!currentUser) {
        if (view === "login") {
            return <Auth onLogin={handleLogin} />;
        }

        return (
            <PublicIndexPage
                onLogin={() => setView("login")}
                onSelectPost={(id) => {
                    setSelectedPostId(id);
                    setView("publicPost");
                }}
                onSelectUser={(username) => {
                    setSelectedUsername(username);
                    setView("publicUser");
                }}
            />
        );
    }

    if (view === "users") {
        return <UsersPage token={token}
                          onBack={() => setView("menu")}
                          onSelectUser={(username) => {
                              setSelectedUsername(username);
                              setView("singleUser");
                          }}
        />;
    }

    if (view === "publicPost") {
        return (
            <SinglePost
                postId={selectedPostId}

                token={token}
                onBack={() => setView("index")}
            />
        );
    }

    if (view === "publicUser") {
        return (
            <SingleUser
                username={selectedUsername}
                token={token}

                onBack={() => setView("index")}
            />
        );
    }


    if (view === "posts") {
        return (
            <PostsPage
                onBack={() => setView("menu")}
                onSelectPost={(id) => {
                    setSelectedPostId(id);
                    setView("singlePost");
                }}
            />
        );
    }

    if (view === "singlePost") {
        return (
            <SinglePost
                postId={selectedPostId}
                currentUser={currentUser}
                token={token}
                onBack={() => setView("posts")}
            />
        );
    }

    if (view === "createPost") {
        return (
            <CreatePost
                token={token}
                currentUser={currentUser}
                onBack={() => setView("menu")}
            />
        );
    }

    if (view === "singleUser") {
        return (
            <SingleUser
                username={selectedUsername}
                token={token}
                currentUser={currentUser}
                onBack={() => setView("users")}
            />
        );
    }

    if (view === "profile") {
        return <ProfilePage
            currentUser={currentUser}
            token={token}
            onBack={() => setView("menu")}
        onUpdateUser={handleUpdateUser}
        />;
    }



    return (
        <div>

            <h2>Welcome, {currentUser.username}</h2>
            <button onClick={() => setView("users")}>See All Users</button>
            <button onClick={() => setView("posts")}>See All Posts</button>
            <button onClick={() => setView("createPost")}>Create Post</button>
            <button onClick={() => setView("profile")}>My Profile</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );

};

export default App;
