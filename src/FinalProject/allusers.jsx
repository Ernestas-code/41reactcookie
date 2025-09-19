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
        <div style={{ padding: "20px" }}>
            <h2>All Users ({users.length})</h2>

            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <div style={{ display: "grid", gap: "15px", maxWidth: "800px" }}>
                    {users.map((user) => (
                        <div key={user._id} style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            borderRadius: "5px",
                            backgroundColor: "#f9f9f9",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <div>
                                <h4 style={{ margin: "0 0 5px 0" }}>{user.username}</h4>
                                <p style={{ margin: 0, color: "#666" }}>{user.email}</p>
                            </div>
                            <Link to={`/user/${user.username}`}>
                                <button style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "3px",
                                    cursor: "pointer"
                                }}>
                                    View Profile
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