import React, { useEffect, useState } from "react";

const ProfilePage = ({token}) => {
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

        </div>
    );
};

export default ProfilePage;