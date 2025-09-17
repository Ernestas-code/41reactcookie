import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:2500");

const Socket2 = () => {
    const usernameRef = useRef();
    const messageRef = useRef();
    const [showRegister, setShowRegister] = useState(true);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        socket.on("usersList", (users) => {
            setUsers(users);
            setShowRegister(false);
        });

        socket.on("privateMessage", ({ fromUsername, message }) => {
            setMessages((prev) => [...prev, `${fromUsername}: ${message}`]);
        });

        return () => {
            socket.off("usersList");
            socket.off("privateMessage");
        };
    }, []);

    function registerUser() {
        const username = usernameRef.current.value.trim();
        if (username) {
            setCurrentUser(username);
            socket.emit("registerUser", username);
        }
    }

    function sendMessage() {
        if (selectedUser && messageRef.current.value.trim()) {
            const time = new Date().toLocaleTimeString();

            socket.emit("privateMessage", {
                toUsername: selectedUser.username,
                message: messageRef.current.value,
                fromUsername: currentUser,
            });
            setMessages((prev) => [
                ...prev,
                `You -> ${selectedUser.username} (${time}): ${messageRef.current.value}`,
            ]);
            messageRef.current.value = "";
        }
    }

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {showRegister ? (
                <div style={{ margin: "auto" }}>
                    <input ref={usernameRef} type="text" placeholder="Enter username" />
                    <button onClick={registerUser}>Register</button>
                </div>
            ) : (
                <>
                    {/* Sidebar users */}
                    <div
                        style={{
                            width: "200px",
                            borderRight: "1px solid #ccc",
                            padding: "10px",
                        }}
                    >
                        <h4>Users Online</h4>
                        {users.map((u) => (
                            <div
                                key={u.socket_id}
                                style={{
                                    cursor: "pointer",
                                    fontWeight: selectedUser?.username === u.username ? "bold" : "normal",
                                }}
                                onClick={() => setSelectedUser(u)}
                            >
                                {u.username}
                            </div>
                        ))}
                    </div>

                    {/* Chat window */}
                    <div style={{ flex: 1, padding: "10px" }}>
                        <h4>
                            Chatting with: {selectedUser ? selectedUser.username : "No one"}
                        </h4>

                        <div
                            style={{
                                border: "1px solid #ccc",
                                height: "300px",
                                padding: "10px",
                                overflowY: "auto",
                                marginBottom: "10px",
                            }}
                        >
                            {messages.map((msg, i) => (
                                <div key={i}>{msg}</div>
                            ))}
                        </div>

                        {selectedUser && (
                            <div>
                                <input ref={messageRef} type="text" placeholder="Type message..." />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Socket2;