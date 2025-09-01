import React, { useState } from "react";

const App = () => {
    const [regData, setRegData] = useState({ email: "", password1: "", password2: "" });
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");


    const register = async () => {
        try {
            const res = await fetch("http://localhost:2500/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(regData),
            });
            const data = await res.json();
            setMessage(data.message || data.error);
        } catch (err) {
            console.error(err);
        }
    };


    const login = async () => {
        try {
            const res = await fetch("http://localhost:2500/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });
            const data = await res.json();
            setMessage(data.email ? `Logged in as ${data.email}` : data.error);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Register</h2>
            <input
                type="email"
                placeholder="Email"
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={regData.password1}
                onChange={(e) => setRegData({ ...regData, password1: e.target.value })}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={regData.password2}
                onChange={(e) => setRegData({ ...regData, password2: e.target.value })}
            />
            <button onClick={register}>Register</button>

            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button onClick={login}>Login</button>

            <h3>{message}</h3>
        </div>
    );
};

export default App;