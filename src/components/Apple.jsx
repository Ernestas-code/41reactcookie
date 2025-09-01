import React, {useState} from 'react';
import {useStore} from "../Store/Store";
const Apple = () => {
    const apples = useStore((state) => state.apples);
    const increaseApple = useStore((state) => state.increaseApple);
    const setApples = useStore((state) => state.setApples);

    const [input, setInput] = useState("");

    const isValidNumber = input !== "" && Number.isFinite(Number(input));

    const setToInput = () => {
        if (!isValidNumber) return;
        setApples(Number(input));
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setToInput();
        }
    };
    return (
        <div className="fruit-card apple-card">
            <div className="apple-header">
                <h2>Apples</h2>
                <span className="apple-count">{apples}</span>
            </div>

            <div className="apple-actions">
                <button onClick={increaseApple}>+1 apple</button>
            </div>

            <div className="apple-set">
                <label htmlFor="apple-input">Set value</label>
                <div className="apple-input-row">
                    <input
                        id="apple-input"
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="example 20"
                    />
                    <button onClick={setToInput} disabled={!isValidNumber}>
                        Set apple value
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Apple;