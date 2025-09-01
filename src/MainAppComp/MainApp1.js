import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddIcon from "./AddIcon";
import AlliconsList from "./AlliconsList";
import Deletedicons from "./Deletedicons";
const MainApp1 = () => {
    const [cards, setCards] = useState([]);
    const [message, setMessage] = useState('');
    const [deletedCards, setDeletedCards] = useState([]);

    const addCard = ({ title, quantity, emojis, color }) => {
        if (cards.length >= 10) {
            setMessage('Maximum 10 cards allowed.');
            return;
        }
        const newCard = {
            id: Date.now(), // unique id
            title,
            quantity,
            emojis,
            color,
            createdAt: new Date().toLocaleTimeString(),
        };
        setCards([...cards, newCard]);
    };

    const deleteCard = (cardToDelete) => {
        const updatedCards = cards.filter(card => card !== cardToDelete);
        setCards(updatedCards);
        setDeletedCards([...deletedCards, cardToDelete]);
        setMessage(`Card "${cardToDelete.title}" moved to Deleted Items.`);
    };

    const restoreCard = (cardToRestore) => {
        const updatedDeletedCards = deletedCards.filter(card => card !== cardToRestore);
        setDeletedCards(updatedDeletedCards);
        setCards([...cards, cardToRestore]);
        setMessage(`Card "${cardToRestore.title}" restored.`);
    };

    const updateCard = (updatedCard) => {
        setCards(cards.map(card =>
            card.id === updatedCard.id ? updatedCard : card
        ));
        setMessage(`Card "${updatedCard.title}" updated.`);
    };
    return (
        <Router>
            <div style={{ padding: "20px", fontFamily: "Arial" }}>
                <nav style={{ marginBottom: "20px" }}>
                    <h1 style={{ marginBottom: "10px" }}>Emoji Card App</h1>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Link to="/" style={{ padding: "6px 12px", background: "#3f51b5", color: "white", textDecoration: "none" }}>All Cards</Link>
                        <Link to="/add" style={{ padding: "6px 12px", background: "purple", color: "white", textDecoration: "none" }}>Add New Card</Link>
                        <Link to="/deleted" style={{ padding: "6px 12px", background: "orange", color: "white", textDecoration: "none" }}>Deleted Icons</Link>
                    </div>
                </nav>

                {message && (
                    <div style={{ padding: "10px", background: "#d4edda", marginBottom: "20px" }}>
                        {message}
                    </div>
                )}

                <Routes>
                    <Route path="/" element={<AlliconsList cards={cards} deleteCard={deleteCard} updateCard={updateCard} />} />
                    <Route path="/add" element={<AddIcon onAdd={addCard} />} />
                    <Route path="/deleted" element={<Deletedicons deletedCards={deletedCards} restoreCard={restoreCard} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default MainApp1;