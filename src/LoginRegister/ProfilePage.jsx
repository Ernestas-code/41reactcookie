import React, { useEffect, useState } from "react";

const ProfilePage = ({token,onBack}) => {
    const [pokes, setPokes] = React.useState([]);
    useEffect(() => {
        const fetchPokes = async () => {
            try {
                const res = await fetch("http://localhost:2500/api/pokes",{
                    headers: {Authorization: token}
                })
                const data = await res.json();
                setPokes(data);
            }
            catch (err) {
                console.error("failed to poke",err);
            }
        };
        fetchPokes();
    }, [token])
    return (
        <div>
            <h2>My Profile</h2>
            <button onClick={onBack}>⬅ Back</button>

            <h3>People who poked me:</h3>
            <ul>
                {pokes.map((poke, i) => (
                    <li key={i}>
                        {poke.fromUser} - {new Date(poke.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilePage;