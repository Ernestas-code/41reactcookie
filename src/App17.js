import React, {useState,useEffect} from 'react';

const App17 = () => {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState('');
    const [gameOver, setGameOver] = useState(false);
    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(data => {
                setDeckId(data.deck_id);
            });
    }, []);
    const getCardValue =(value) => {
        if (['KING', 'QUEEN', 'JACK'].includes(value)) return 10;
        if (value==='ACE') return 11
        return parseInt(value);
    }
    const drawCard = () => {
        if (!deckId || gameOver) return;
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(res => res.json())
            .then(data => {
                const card = data.cards[0];
                const cardValue = getCardValue(card.value);
                const newScore = score + cardValue;
                setCards(prev => [...prev, card]);
                setScore(newScore);
                if (newScore === 21) {
                    setStatus('You win!');
                    setGameOver(true);
                } else if (newScore > 21) {
                    setStatus('You lose! ');
                    setGameOver(true);
                }
            });
    }
    const resetGame = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
            .then(res => res.json())
        .then(data => {
            setCards([])
            setScore(0)
            setStatus('');
            setGameOver(false);
        })
    }

    return (
        <div>
            <h1>Get 21</h1>
            <p>Score: {score}</p>
            <button onClick={drawCard} disabled={gameOver}>
               Draw Card
            </button>
            <button onClick={resetGame}>Restart</button>
            <p>{status}</p>
            <div className="card-container">
                {cards.map(card => (
                    <img
                        key={card.code}
                        src={card.image}
                        alt={`${card.value} of ${card.suit}`}
                        width="100"
                    />
                ))}
            </div>
        </div>
    );
};

export default App17;