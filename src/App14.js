import React, { useState } from "react";
import EmojiCard from "./components/EmojiCard";
import CardEmojiForm from "./components/CardEmojiForm";
function App14() {
    const [cards, setCards] = useState([]);

    function addCard(card) {
        const newCard = {
            id: Date.now(),
            createdAt: new Date().toLocaleTimeString(),
            ...card,
        };
        setCards([...cards, newCard]);
    }

    function removeCard(id) {
        setCards(cards.filter((c) => c.id !== id));
    }

    return (
        <div style={{ padding: 30, textAlign: "center" }}>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
                {cards.map((card) => (
                    <EmojiCard
                        key={card.id}
                        emojis={card.emojis}
                        color={card.color}
                        text={card.text}
                        createdAt={card.createdAt}
                        onRemove={() => removeCard(card.id)}
                    />
                ))}
            </div>

            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between' , flexDirection: 'row', alignItems: 'center'  }}>
                <CardEmojiForm onAdd={addCard} />
                <CardEmojiForm onAdd={addCard} />
                <CardEmojiForm onAdd={addCard} />

            </div>
        </div>
    );
}

export default App14;