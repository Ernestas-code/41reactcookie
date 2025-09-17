import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import SinglePost from "./SinglePost";
import CreatePost from "./CreatePost";
import SingleUser from "./SingleUser";
const UsersPage = ({ token, onBack }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2500/api/users", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then(setUsers)
            .catch((err) => console.error(err));
    }, [token]);

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users.map((u) => (
                    <li key={u._id}>
                        {u.username} ({u.email})
                    </li>
                ))}
            </ul>
            <button onClick={onBack}>Back</button>
        </div>
    );
};

const PostsPage = ({ onBack }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2500/api/posts")
            .then((res) => res.json())
            .then(setPosts)
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2>All Posts</h2>
            <ul>
                {posts.map((p) => (
                    <li key={p._id}>{p.content || p.title}</li>
                ))}
            </ul>
            <button onClick={onBack}>Back</button>
        </div>
    );
};

const ProfilePage = ({ currentUser, onBack }) => (
    <div>
        <h2>My Profile</h2>
        <p>
            <b>Username:</b> {currentUser.username}
        </p>
        <p>
            <b>Email:</b> {currentUser.email}
        </p>
        <button onClick={onBack}>Back</button>
    </div>
);

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [view, setView] = useState("menu");
    const [selectedPostId, setSelectedPostId] = useState(null);


    const handleLogin = (data) => {
        setCurrentUser(data);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setView("menu");
    };

    if (!currentUser) {
        return <Auth onLogin={handleLogin} />;
    }

    if (view === "users") {
        return <UsersPage token={token} onBack={() => setView("menu")} />;
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

    if (view === "profile") {
        return <ProfilePage currentUser={currentUser} onBack={() => setView("menu")} />;
    }

    return (
        <div>
            <h2>Welcome, {currentUser.username}</h2>
            <button onClick={() => setView("users")}>See All Users</button>
            <button onClick={() => setView("posts")}>See All Posts</button>
            <button onClick={() => setView("createPost")}>Create Post</button>
            <button onClick={() => setView("profile")}>My Profile</button>
            <button
                onClick={() => {
                    setCurrentUser(null);
                    setToken("");
                    localStorage.removeItem("token");
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default App;
