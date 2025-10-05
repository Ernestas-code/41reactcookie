import React, {useState,useEffect} from 'react';
import { Link} from "react-router-dom";
const Allusers = ({token}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch("http://localhost:2500/api/users",{
                headers: {Authorization: `Bearer ${token}`}
            });
            const userData = await res.json();
            setUsers(userData);
        }
        fetchUsers();
    },[token])
    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#E9E3DF",
                padding: "40px",
            }}
        >
            <h1
                style={{
                    color: "#000",
                    marginBottom: "30px",
                    fontSize: "28px",
                    fontWeight: "700",
                }}
            >
                All Users ({users.length})
            </h1>

            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gap: "20px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    }}
                >
                    {users.map((user) => (
                        <div
                            key={user._id}
                            style={{
                                padding: "20px",
                                backgroundColor: "white",
                                borderRadius: "16px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "scale(1.02)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                            }
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <div
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        backgroundColor: "#FF7A30",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                        color: "white",
                                    }}
                                >
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4
                                        style={{
                                            margin: 0,
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            color: "#000",
                                        }}
                                    >
                                        {user.username}
                                    </h4>
                                    <p style={{ margin: 0, color: "#465C88", fontSize: "14px" }}>
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <Link
                                to={`/user/${user.username}`}
                                style={{ textDecoration: "none" }}
                            >
                                <button
                                    style={{
                                        padding: "10px 18px",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "500",
                                    }}
                                >
                                    View
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Allusers;