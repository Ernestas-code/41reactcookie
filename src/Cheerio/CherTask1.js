import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GamePage from "./GamePage";

function Home() {
    const [games, setGames] = useState([]);

    const loadGames = async (category) => {
        const response = await fetch(`http://localhost:2500/games/${encodeURIComponent(category)}`);
        const data = await response.json();
        setGames(data);
    };
    const buttonStyle = {
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        padding: "10px 20px",
        margin: "5px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "0.3s",
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Game Categories</h1>
            <button style={buttonStyle} onClick={() => loadGames("android/arcade")}>Arcade</button>
            <button style={buttonStyle} onClick={() => loadGames("android/action-adventure")}>Action</button>
            <button style={buttonStyle} onClick={() => loadGames("android/strategy")}>Strategy</button>
            <button style={buttonStyle} onClick={() => loadGames("android/rpg")}>Rpg</button>
            <button style={buttonStyle} onClick={() => loadGames("android/sports")}>Sports</button>

            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                {games.map((game, index) => (
                    <div
                        key={index}
                        style={{
                            width: "200px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "10px",
                            margin: "10px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={game.img}
                            alt={game.title}
                            style={{ width: "100px", height: "100px" }}
                        />
                        <h3 style={{ fontSize: "16px" }}>{game.title}</h3>
                        <Link to={`/game`} state={game}>
                            <button>View</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<GamePage />} />
            </Routes>
        </Router>
    );
}

export default App;