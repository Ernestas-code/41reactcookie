import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:2500");

const SingleUserPage = ({ username, token, currentUser, onBack }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pokeMessage, setPokeMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:2500/api/user/${username}`);

                if (!res.ok) {
                    throw new Error('User not found');
                }

                const userData = await res.json();
                setUser(userData);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUser();
        }
    }, [username]);

    useEffect(() => {
        if (!currentUser) return
        const handlePokeNotification =  (data) => {
            if (data.to === currentUser.username) {
                setPokeMessage(`${data.from} poked you`)
                setTimeout(() => setPokeMessage(""),5000)
            }
        }
        socket.on("poked", handlePokeNotification);
        return () => {
            socket.off("poked", handlePokeNotification);
        }
    }, [currentUser]);

    const handlePoke = async () => {
        if (!user || !currentUser || !token) return;

            const res = await fetch(`http://localhost:2500/api/poke/${user._id}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            alert(data.message);

            socket.emit("poke", {
                from: currentUser.username,
                to: user.username
            });

    };

    if (!user) return <p>Loading...</p>;

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer"
                    }}
                >
                    ← Back
                </button>
            </div>

            <div style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff"
            }}>
                <h2 style={{ color: "#333", marginBottom: "20px" }}>
                    {user.username}'s Public Profile
                </h2>

                <div style={{ marginBottom: "20px" }}>
                    <p style={{ marginBottom: "10px" }}>
                        <b>Username:</b> {user.username}
                    </p>
                    <p style={{ marginBottom: "20px" }}>
                        <b>Email:</b> {user.email}
                    </p>
                </div>

                {currentUser && token && currentUser.username !== user.username && (
                    <button
                        onClick={handlePoke}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                    >
                        👋 Poke {user.username}
                    </button>
                )}

                {!currentUser && (
                    <div style={{
                        padding: "15px",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        borderRadius: "5px",
                        color: "#6c757d"
                    }}>
                        <p>Log in to poke {user.username}!</p>
                    </div>
                )}

                {currentUser && currentUser.username === user.username && (
                    <div style={{
                        padding: "15px",
                        backgroundColor: "#fff3cd",
                        border: "1px solid #ffeaa7",
                        borderRadius: "5px",
                        color: "#856404"
                    }}>
                        <p>This is your own profile! Visit "My Profile" to see your poke history.</p>
                    </div>
                )}
            </div>

            {pokeMessage && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "15px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    zIndex: 1000
                }}>
                    🎉 {pokeMessage}
                </div>
            )}
        </div>
    );
};

export default SingleUserPage;
