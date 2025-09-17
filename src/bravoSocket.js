import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:2500");

export default function App22() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [bgColor, setBgColor] = useState("white");
    const [inputColor, setInputColor] = useState("");
    const colorRef = useRef();

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onColorChanged(color) {
            setBgColor(color);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("colorChanged", onColorChanged);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("colorChanged", onColorChanged);
        };
    }, []);

    const sendColor = (e) => {
        e.preventDefault();
        const pickedColor = colorRef.current.value;
        if (pickedColor) {
            socket.emit("setColor", pickedColor);
        }
    };

    return (
        <div
            className="h-screen flex flex-col items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: bgColor }}
        >
            <h1 className="text-2xl font-bold mb-4">
                {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
            </h1>

            <form onSubmit={sendColor} className="flex space-x-2">
                <input
                    type="color"
                    ref={colorRef}
                    defaultValue="#ffffff"
                    className="w-16 h-10 cursor-pointer border rounded"
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

