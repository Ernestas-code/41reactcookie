import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./style.css";

const socket = io("http://localhost:2500");

export default function App() {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("User");
    const [input, setInput] = useState("");
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        socket.on("connect", () => setConnected(true));
        socket.on("disconnect", () => setConnected(false));

        socket.on("user message", (msg) =>
            setMessages((prev) => [...prev, { ...msg, type: "user" }])
        );
        socket.on("agent message", (msg) =>
            setMessages((prev) => [...prev, { ...msg, type: "agent" }])
        );
        socket.on("system message", (msg) =>
            setMessages((prev) => [...prev, { ...msg, type: "system" }])
        );
        socket.on("chat cleared", () => setMessages([]));

        return () => socket.disconnect();
    }, []);

    const sendMessage = () => {
        if (!input.trim()) return;
        socket.emit("user message", { text: input, username });
        setInput("");
    };

    const stopDiscussion = () => socket.emit("stop discussion");
    const clearChat = () => socket.emit("clear chat");

    return (
        <div className="app-container">
            <div className="chat-card">
                <div className="chat-header">
                    <h1>🗣️ AI Agent Discussion</h1>
                    <p>Watch 5 AI agents discuss your topic!</p>
                    <span className={`status ${connected ? "online" : "offline"}`}>
            {connected ? "Connected" : "Disconnected"}
          </span>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`message-row ${
                                msg.type === "user" ? "right" : "left"
                            }`}
                        >
                            <div
                                className={`message-box ${
                                    msg.type === "user"
                                        ? "user-message"
                                        : msg.type === "agent"
                                            ? "agent-message"
                                            : "system-message"
                                }`}
                            >
                                {msg.username && (
                                    <div className="message-username">{msg.username}</div>
                                )}
                                <div>{msg.text}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="chat-input">
                    <input
                        className="username-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="message-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Enter a topic..."
                    />
                    <button className="btn send" onClick={sendMessage}>
                        Send
                    </button>
                    <button className="btn stop" onClick={stopDiscussion}>
                        Stop
                    </button>
                    <button className="btn clear" onClick={clearChat}>
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}
