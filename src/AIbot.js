import React, { useState } from "react";
import "./Sockets/style.css";
const App = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askAi = async () => {
        try {
            const res = await fetch("http://localhost:2500/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question }),
            });

            const data = await res.json();
            setAnswer(data.answer);
        } catch (err) {
            console.error("Error asking AI:", err);
            setAnswer("Error connecting to server.");
        }
    };

    return (
        <div className="app-container">
            <div className="card">
                <h2>Ask My AI 🤖</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Type your question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button onClick={askAi}>Ask</button>
                </div>

                {answer && (
                    <div className="answer-box">
                        <h3>Answer:</h3>
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;