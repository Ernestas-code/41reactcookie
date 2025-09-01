import React, { useState } from 'react';
import InputCard from "./components/InputCard";
import CardList from "./components/CardList";
import ProgressBar from "./components/ProgressBar";

const App17ProgBarTask = () => {
    const [cards, setCards] = useState([]);

    const addCard = (input) => {
        if (cards.length >= 10 || input.trim() === '') return;

        const newCard = {
            text: input,
            createdAt: new Date().toLocaleTimeString()
        };

        setCards([...cards, newCard]);
    };

    return (
        <div style={{ padding: 30 }}>
            <h2>Input Table</h2>
            <InputCard onAdd={addCard} />
            <CardList cards={cards} />
            <ProgressBar count={cards.length} />
        </div>
    );
};

export default App17ProgBarTask;