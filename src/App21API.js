import React, { useState,useEffect } from 'react';
import PostList from "./Pages1/PostList";
import GetUserPosts from "./Pages1/GetUserPosts";
import CreateAcc from "./Pages1/CreateAcc";
import CreatePost from "./Pages1/CreatePost";
import DeletePost from "./Pages1/DeletePost";
import UpdatePost from "./Pages1/UpdatePost";
import FavouritePage from "./Pages1/FavouritePage";
const App21Api = () => {
    const [secretKey, setSecretKey] = useState(localStorage.getItem("randomGeneratedKey123") || "");
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [page, setPage] = useState("login");
    const [postId, setPostId] = useState("");
    const [inputPostId, setInputPostId] = useState("");
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites") || "[]");
        } catch {
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    const TOKEN_KEY = "randomGeneratedKey123";
    const handleLogin = (name, key) => {
        setUsername(name);
        setSecretKey(key);
        localStorage.setItem(TOKEN_KEY, key);
        localStorage.setItem("username", name);
        setPage("all");
    };

    const handleLogout = () => {
        setUsername("");
        setSecretKey("");
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem("username");
        setPage("login");
    };



    const addToFavorites = (post) => {
        setFavorites((prev) => {
            if (prev.some((p) => p.id === post.id)) return prev;
            return [...prev, post];
        });
    };

    const removeFromFavorites = (id) => {
        setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    };
    return (
        <div>
            <h1>Post Manager</h1>
            {secretKey && (
                <nav style={{ marginBottom: "20px" }}>
                    <button onClick={() => setPage("all")}>All Posts</button>
                    <button onClick={() => setPage("my")}>My Posts</button>
                    <button onClick={() => setPage("create")}>Create</button>
                    <button onClick={() => setPage("update")}>Update</button>
                    <button onClick={() => setPage("delete")}>Delete</button>
                    <button onClick={() => setPage("favorites")}>
                        Favorites ({favorites.length})
                    </button>
                    <button onClick={handleLogout} style={{ marginLeft: '20px', color: 'red' }}>
                        Logout
                    </button>
                </nav>
            )}

            {!secretKey && <CreateAcc onLogin={handleLogin} />}
            {secretKey && page === "all" && <PostList onAddFavorite={addToFavorites}   favorites={favorites} />}
            {secretKey && page === "my" && <GetUserPosts username={username} />}
            {secretKey && page === "create" && <CreatePost secretKey={secretKey} />}
            {secretKey && page === "update" && <UpdatePost secretKey={secretKey} />}
            {secretKey && page === "delete" && <DeletePost secretKey={secretKey} />}
            {secretKey && page === "favorites" && (<FavouritePage favorites={favorites}
                                                                  onRemoveFavorite={removeFromFavorites}
                />
            )}


        </div>
    );
};

export default App21Api;