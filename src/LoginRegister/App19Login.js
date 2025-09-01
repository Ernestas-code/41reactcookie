import React, { useState } from "react";
import Auth from "./Auth";
import PageLike from "./PageLike";
import CreatingPost from "./CreatingPost";

const App19Login = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showCreatePost, setShowCreatePost] = useState(false);


    const handleLogin = (username, id) => {
        setCurrentUser(username);
        setUserId(id);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setUserId(null);
        setShowCreatePost(false);
    };

    return (
        <div>
            {!currentUser ? (
                <Auth onLogin={handleLogin} />
            ) : showCreatePost ? (
                <CreatingPost
                    userId={userId}
                    onBack={() => setShowCreatePost(false)}
                />
            ) : (
                <PageLike
                    currentUser={currentUser}
                    userId={userId}
                    onLogout={handleLogout}
                    onCreatePost={() => setShowCreatePost(true)}
                />
            )}
        </div>
    );
};

export default App19Login;
