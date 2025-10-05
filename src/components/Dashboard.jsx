import React from 'react';
import {Link} from 'react-router-dom';
const Dashboard = ({currentUser}) => {
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Welcome back, {currentUser.username}!</h1>

            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "30px" }}>
                <Link to="/create">
                    <button style={{ padding: "15px 25px", fontSize: "16px" }}>
                        Create New Post
                    </button>
                </Link>

                <Link to="/posts">
                    <button style={{ padding: "15px 25px", fontSize: "16px" }}>
                        Browse Posts
                    </button>
                </Link>

                <Link to="/users">
                    <button style={{ padding: "15px 25px", fontSize: "16px" }}>
                        See All Users
                    </button>
                </Link>

                <Link to="/profile">
                    <button style={{ padding: "15px 25px", fontSize: "16px" }}>
                        My Profile
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;