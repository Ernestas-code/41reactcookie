import React, { useState } from "react";
import Auth from "./Auth";
import PageLike from "./PageLike";
import CreatingPost from "./CreatingPost";
import UsersPage from "./UsersPage";
import ProfilePage from "./ProfilePage";

const App19Login = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userId, setUserId] = useState(null);
    // const [showCreatePost, setShowCreatePost] = useState(false);
    const [token, setToken] = useState(null);
    const [view, setView] = useState("menu");



    const handleLogin = (data) => {
        setCurrentUser(data.username);
        setUserId(data.userId);
        setToken(data.token);
        setView("menu");

    };

    const handleLogout = () => {
        setCurrentUser(null);
        setUserId(null);
        // setShowCreatePost(false);
        setToken(null);
        setView("menu");
    };

    return (
        <div>
            {!currentUser ? (
                <Auth onLogin={handleLogin} />
            ) : view === "users" ? (
                <UsersPage currentUser={currentUser} token={token} onBack={() => setView("menu")} />
            ) : view === "profile" ? (
                <ProfilePage currentUser={currentUser} token={token} onBack={() => setView("menu")} />
            ) : (
                <div>
                    <h2>Welcome, {currentUser}</h2>
                    <button onClick={() => setView("users")}>All Users</button>
                    <button onClick={() => setView("profile")}>My Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}












            {/*{!currentUser ? (*/}
            {/*    <Auth onLogin={handleLogin} />*/}
            {/*) : showCreatePost ? (*/}
            {/*    <CreatingPost*/}
            {/*        userId={userId}*/}
            {/*        onBack={() => setShowCreatePost(false)}*/}
            {/*    />*/}
            {/*) : (*/}
            {/*    <PageLike*/}
            {/*        currentUser={currentUser}*/}
            {/*        userId={userId}*/}
            {/*        onLogout={handleLogout}*/}
            {/*        onCreatePost={() => setShowCreatePost(true)}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    );
};

export default App19Login;
