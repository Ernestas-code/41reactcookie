import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:2500");

const SingleUserPage = ({ username, token, currentUser, onBack }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:2500/api/user/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then(setUser)
            .catch(console.error);
    }, [username, token]);

    const handlePoke = async () => {
        if (!user) return;
        try {
            const res = await fetch(`http://localhost:2500/api/poke/${user._id}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            alert(data.message);

            socket.emit("poke", { from: currentUser.username, to: user.username });
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>{user.username}'s Profile</h2>
            <p><b>Email:</b> {user.email}</p>
            <button onClick={handlePoke}>Poke</button>
            <button onClick={onBack}>Back</button>
        </div>
    );
};

export default SingleUserPage;
