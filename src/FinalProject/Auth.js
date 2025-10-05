import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Auth = ({ onLogin }) => {
    const navigate = useNavigate();
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
                    email: data.email || formData.email,
                    userId: data.userId,
                });
                // localStorage.setItem("token", data.token);
                console.log("Login success, token:", data.token);
                navigate('/')

            }
    };
    const containerStyle = {
        minHeight: "100vh",
        backgroundColor: "#E9E3DF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    };

    const cardStyle = {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        margin: "10px 0",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "14px",
    };

    const buttonStyle = {
        width: "100%",
        padding: "14px",
        backgroundColor: "#FF7A30",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        marginTop: "10px",
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={{ marginBottom: "20px", color: "#000" }}>
                    {isRegister ? "Register" : "Login"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={inputStyle}
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={inputStyle}
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
                            style={inputStyle}
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                            required
                        />
                    )}
                    {error && (
                        <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
                    )}
                    <button style={buttonStyle} type="submit">
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>
                <p
                    style={{ marginTop: "20px", color: "#465C88", cursor: "pointer" }}
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister
                        ? "Already have an account? Login"
                        : "Don't have an account? Register"}
                </p>
            </div>
        </div>
    );
};

export default Auth;