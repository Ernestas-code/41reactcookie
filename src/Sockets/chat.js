import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:2500"); // your server

export default function Chat({ username }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("chat message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("chat message");
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const msgData = {
                user: username,
                text: message,
                time: new Date().toISOString(),
            };
            socket.emit("chat message", msgData);
            console.log(msgData);
            setMessage("");
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Chat Room</h1>

            <ul className="w-full max-w-md bg-gray-100 rounded-lg p-4 mb-4 space-y-2">
                {messages.map((msg, idx) => (
                    <li
                        key={idx}
                        className="bg-white p-2 rounded shadow text-gray-800"
                    >
                        <b>{msg.user}</b> ({new Date(msg.time).toLocaleTimeString()}):{" "}
                        {msg.text}
                    </li>
                ))}
            </ul>

            <form
                onSubmit={sendMessage}
                className="flex w-full max-w-md space-x-2"
            >
                <input
                    className="flex-grow border rounded px-3 py-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
