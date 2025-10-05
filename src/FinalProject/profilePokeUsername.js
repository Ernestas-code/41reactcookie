import React,{useState,useEffect} from 'react';

const ProfilePokeUsername = ({currentUser,token,onUpdateUser}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(currentUser.username);
    const [pokes, setPokes] = useState([]);
    useEffect(() => {
        const fetchPokes = async () => {
            const res=await fetch("http://localhost:2500/api/pokes",{
                headers :{ Authorization: `Bearer ${token}` }
            });
            const pokesData = await res.json();
            setPokes(pokesData);
        }
        fetchPokes();
    },[token])

    const handleUpdateUsername = async () => {
        if (!newUsername.trim() || newUsername ===currentUser.username) {
            setIsEditing(false)
            setNewUsername(currentUser.username)
            return
        }
        const res = await fetch("http://localhost:2500/api/update-username", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({username: newUsername.trim()})
        })
        const data =await res.json();
        console.log("update" ,data)
        const updatedUser = {
            ...currentUser,
            username: newUsername.trim(),
            email: data.user.email,
            userId: data.user._id,
        }
        onUpdateUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        localStorage.setItem("token", data.token);

        setIsEditing(false);
        alert("Username updated successfully1");

        }
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <div style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                marginBottom: "20px"
            }}>
                <h2 style={{ color: "#333", marginBottom: "20px" }}>My Profile (Private)</h2>

                <div style={{ marginBottom: "20px" }}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Username:
                        </label>
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    style={{
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                        borderRadius: "3px",
                                        marginRight: "10px",
                                        width: "200px"
                                    }}
                                    placeholder="Enter new username"
                                />
                                <button
                                    onClick={handleUpdateUsername}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        marginRight: "5px"
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setNewUsername(currentUser.username);
                                    }}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#dc3545",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Cancel
                                </button>


                            </div>
                        ) : (
                            <div>
                                <span style={{ marginRight: "10px" }}>{currentUser.username}</span>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        fontSize: "12px"
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Email:
                        </label>
                        <span>{currentUser.email}</span>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            User ID:
                        </label>
                        <span style={{ color: "#666", fontSize: "0.9em" }}>{currentUser.userId}</span>
                    </div>
                </div>
            </div>

            <div style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff"
            }}>
                <h3 style={{
                    color: "#333",
                    marginBottom: "15px",
                    borderBottom: "2px solid #007bff",
                    paddingBottom: "10px"
                }}>
                    Poke History ({pokes.length})
                </h3>


                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                            <tr style={{ backgroundColor: "#f8f9fa" }}>
                                <th style={{
                                    padding: "10px",
                                    textAlign: "left",
                                    border: "1px solid #ddd"
                                }}>
                                    Who Poked You
                                </th>
                                <th style={{
                                    padding: "10px",
                                    textAlign: "left",
                                    border: "1px solid #ddd"
                                }}>
                                    When
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {pokes
                                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Most recent first
                                .map((poke, index) => (
                                    <tr key={index} style={{
                                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white"
                                    }}>
                                        <td style={{
                                            padding: "10px",
                                            border: "1px solid #ddd"
                                        }}>
                                            <strong>{poke.fromUser}</strong>
                                        </td>
                                        <td style={{
                                            padding: "10px",
                                            border: "1px solid #ddd"
                                        }}>
                                            {new Date(poke.date).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

            </div>
        </div>
    );
};

export default ProfilePokeUsername;