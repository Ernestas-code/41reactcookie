import React, { useState } from "react";

const Auth = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");


            if (isRegister) {

                const res = await fetch("http://localhost:2500/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (!res.ok) return setError(data.error || "Register failed");
                alert("Registered successfully!");
            } else {
                const res = await fetch("http://localhost:2500/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                const data = await res.json();
                if (!res.ok) return setError(data.error || "Login failed");


                onLogin({
                    token: data.token,
                    username: data.username,
                    email: data.email,
                    userId: data.userId,
                });
                localStorage.setItem("token", data.token);
                console.log("Login success, token:", data.token);

            }


    };

    return (
        <div style={{ maxWidth: "300px", margin: "auto", fontFamily: "sans-serif" }}>
            <h2>{isRegister ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    required
                />
                {isRegister && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        required
                    />
                )}
                {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
                <button type="submit">{isRegister ? "Register" : "Login"}</button>
            </form>
            <p
                style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
                onClick={() => setIsRegister(!isRegister)}
            >
                {isRegister
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
            </p>
        </div>
    );
};

export default Auth;