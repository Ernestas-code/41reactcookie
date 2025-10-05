import React, {useState} from "react";
import { Link , useLocation} from "react-router-dom";

const Navbar = ({ currentUser, onLogout }) => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#FF7A30",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: "scale(1)"
    };

    const secondaryButtonStyle = {
        padding: "8px 16px",
        backgroundColor: "transparent",
        color: "#465C88",
        border: "2px solid #465C88",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.3s ease"
    };

    return (
        <nav style={{
            backgroundColor: "#465C88",
            padding: "0",
            boxShadow: "0 2px 10px rgba(70, 92, 136, 0.2)",
            position: "sticky",
            top: "0",
            zIndex: "1000"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
                minHeight: "70px"
            }}>
                <Link
                    to="/"
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    <div style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#FF7A30",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px"
                    }}>
                        CA
                    </div>
                    CodeAcademy App
                </Link>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    "@media (max-width: 768px)": {
                        display: "none"
                    }
                }}>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <Link
                            to="/"
                            style={{
                                color: isActive("/") ? "#FF7A30" : "white",
                                textDecoration: "none",
                                fontSize: "16px",
                                fontWeight: "500",
                                transition: "color 0.3s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.color = "#FF7A30"}
                            onMouseLeave={(e) => e.target.style.color = isActive("/") ? "#FF7A30" : "white"}
                        >
                            Home
                        </Link>

                        <Link
                            to="/posts"
                            style={{
                                color: isActive("/posts") ? "#FF7A30" : "white",
                                textDecoration: "none",
                                fontSize: "16px",
                                fontWeight: "500",
                                transition: "color 0.3s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.color = "#FF7A30"}
                            onMouseLeave={(e) => e.target.style.color = isActive("/posts") ? "#FF7A30" : "white"}
                        >
                            Posts
                        </Link>

                        <Link
                            to="/users"
                            style={{
                                color: isActive("/users") ? "#FF7A30" : "white",
                                textDecoration: "none",
                                fontSize: "16px",
                                fontWeight: "500",
                                transition: "color 0.3s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.color = "#FF7A30"}
                            onMouseLeave={(e) => e.target.style.color = isActive("/users") ? "#FF7A30" : "white"}
                        >
                            Users
                        </Link>

                        {currentUser && (
                            <>
                                <Link
                                    to="/create"
                                    style={{
                                        color: isActive("/create") ? "#FF7A30" : "white",
                                        textDecoration: "none",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        transition: "color 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = "#FF7A30"}
                                    onMouseLeave={(e) => e.target.style.color = isActive("/create") ? "#FF7A30" : "white"}
                                >
                                    Create Post
                                </Link>

                                <Link
                                    to="/chat"
                                    style={{
                                        color: isActive("/chat") ? "#FF7A30" : "white",
                                        textDecoration: "none",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        transition: "color 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = "#FF7A30"}
                                    onMouseLeave={(e) => e.target.style.color = isActive("/chat") ? "#FF7A30" : "white"}
                                >
                                    Chat
                                </Link>
                            </>
                        )}
                    </div>

                    {currentUser ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "8px 12px",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px"
                            }}>
                                <div style={{
                                    width: "24px",
                                    height: "24px",
                                    backgroundColor: "#FF7A30",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "white"
                                }}>
                                    {currentUser.username.charAt(0).toUpperCase()}
                                </div>
                                <span style={{ color: "white", fontSize: "14px" }}>
                                    {currentUser.username}
                                </span>
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <Link to="/profile">
                                    <button
                                        style={{
                                            ...secondaryButtonStyle,
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            color: "white",
                                            border: "2px solid rgba(255, 255, 255, 0.3)"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = "#FF7A30";
                                            e.target.style.borderColor = "#FF7A30";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                                            e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                                        }}
                                    >
                                        My Profile
                                    </button>
                                </Link>

                                <button
                                    onClick={onLogout}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: "#FF7A30"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = "scale(1.05)";
                                        e.target.style.boxShadow = "0 4px 12px rgba(255, 122, 48, 0.3)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = "scale(1)";
                                        e.target.style.boxShadow = "none";
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button
                                style={buttonStyle}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = "scale(1.05)";
                                    e.target.style.boxShadow = "0 4px 12px rgba(255, 122, 48, 0.3)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = "scale(1)";
                                    e.target.style.boxShadow = "none";
                                }}
                            >
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        display: "none",
                        "@media (max-width: 768px)": {
                            display: "block"
                        },
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "24px",
                        cursor: "pointer"
                    }}
                >
                    ☰
                </button>
            </div>

            {mobileMenuOpen && (
                <div style={{
                    backgroundColor: "#465C88",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "20px"
                }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", textDecoration: "none" }}>Home</Link>
                        <Link to="/posts" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", textDecoration: "none" }}>Posts</Link>
                        <Link to="/users" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", textDecoration: "none" }}>Users</Link>
                        {currentUser && (
                            <>
                                <Link to="/create" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", textDecoration: "none" }}>Create Post</Link>
                                <Link to="/chat" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", textDecoration: "none" }}>Chat</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;