import React, { useState } from "react";
import Chat from "../Sockets/chat";
export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [token, setToken] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const url = isRegister
                ? "http://localhost:2500/api/register"
                : "http://localhost:2500/api/login";

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) return setError(data.error || "Auth failed");

            if (!isRegister) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
            } else {
                alert("Registered successfully! Now log in.");
                setIsRegister(false);
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    };

    if (token) {
        return <Chat username={formData.username} />;    }

    return (
        <div style={{ maxWidth: "300px", margin: "auto", textAlign: "center" }}>
            <h2>{isRegister ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                    }
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    required
                />
                <br />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">
                    {isRegister ? "Register" : "Login"}
                </button>
            </form>
            <p
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => setIsRegister(!isRegister)}
            >
                {isRegister
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
            </p>
        </div>
    );
}