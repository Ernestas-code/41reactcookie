import React from "react";
import { useLocation, Link } from "react-router-dom";

function GamePage() {
    const { state: game } = useLocation();

    if (!game) return <p>No game data.</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>{game.title}</h1>
            <img
                src={game.img}
                alt={game.title}
                style={{ width: "150px", height: "150px" }}
            />
            <p>{game.description}</p>

            <a href={game.link} target="_blank" rel="noreferrer">
                <button>Download</button>
            </a>

            <br />
            <Link to="/">⬅ Back to Categories</Link>
        </div>
    );
}

export default GamePage;