import React, { useState } from "react";

const CreateAcc = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isRegister) {
                const res = await fetch("http://156.67.83.41:1111/createaccount", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.username,
                        passwordOne: formData.password,
                        passwordTwo: formData.confirmPassword,
                    }),
                });

                const data = await res.json();
                if (!data.success) throw new Error(data.message);
                alert(data.message);
                setIsRegister(false);
            } else {
                const res = await fetch("http://156.67.83.41:1111/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.username,
                        password: formData.password,
                    }),
                });

                const data = await res.json();
                if (!data.success) throw new Error(data.message);

                localStorage.setItem("username", formData.username);
                localStorage.setItem("randomGeneratedKey123", data.secretKey);

                onLogin(formData.username, data.secretKey);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: "300px", margin: "auto", fontFamily: "sans-serif" }}>
            <h2>{isRegister ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
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
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    {isRegister ? "Register" : "Login"}
                </button>
            </form>
            <p
                style={{ marginTop: "10px", cursor: "pointer", color: "blue", textAlign: "center" }}
                onClick={() => setIsRegister(!isRegister)}
            >
                {isRegister
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
            </p>
        </div>
    );
};

export default CreateAcc;