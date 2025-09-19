import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser, onLogout }) => {
    return (
        <nav style={{
            padding: "10px 20px",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#f8f9fa",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Link to="/" style={{ fontSize: "18px", fontWeight: "bold", textDecoration: "none" }}>
                Social App
            </Link>

            <div>
                <Link to="/" style={{ margin: "0 10px", textDecoration: "none" }}>Home</Link>
                <Link to="/posts" style={{ margin: "0 10px", textDecoration: "none" }}>Posts</Link>
                <Link to="/users" style={{ margin: "0 10px", textDecoration: "none" }}>Users</Link>

                {currentUser ? (
                    <>
                        <Link to="/dashboard" style={{ margin: "0 10px", textDecoration: "none" }}>Dashboard</Link>
                        <Link to="/create" style={{ margin: "0 10px", textDecoration: "none" }}>Create Post</Link>
                        <Link to="/profile" style={{ margin: "0 10px", textDecoration: "none" }}>My Profile</Link>
                        <button onClick={onLogout} style={{ marginLeft: "10px" }}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" style={{ margin: "0 10px", textDecoration: "none" }}>Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;