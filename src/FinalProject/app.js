import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./navbar";
import PublicHome from "./Public";
import Auth from "./Auth";
import AllUsers from "./allusers";
import AllPosts from "./allposts";
import SinglePost from "./SinglePost";
import SingleUser from "./SingleUser";
import Profile from "./profilePokeUsername";
import CreatePost from "./CreatePost";
import Chat from "./Chat";
const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState("");

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
        setCurrentUser(data);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data));
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
    };

    const handleUpdateUser = (updatedUser) => {
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    };

    return (
        <Router>
            <div>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />

                <Routes>
                    <Route path="/" element={<PublicHome currentUser={currentUser} />} />
                    <Route path="/login" element={<Auth onLogin={handleLogin} />} />
                    <Route
                        path="/post/:id"
                        element={
                            currentUser ? (
                                <SinglePost currentUser={currentUser} token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="/user/:username" element={<SingleUser currentUser={currentUser} token={token} />} />


                    <Route path="/users" element={
                        currentUser ? <AllUsers token={token} /> : <Navigate to="/login" />
                    } />
                    <Route path="/posts" element={
                        currentUser ? <AllPosts /> : <Navigate to="/login" />
                    } />
                    <Route path="/profile" element={
                        currentUser ? <Profile currentUser={currentUser} token={token} onUpdateUser={handleUpdateUser} /> : <Navigate to="/login" />
                    } />
                    <Route path="/create" element={
                        currentUser ? <CreatePost currentUser={currentUser} token={token} /> : <Navigate to="/login" />
                    } />
                    <Route path="/chat" element={
                        currentUser ? <Chat currentUser={currentUser} /> : <Navigate to="/login" />
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;