import React, { useState } from "react";
import { useStore} from "../Store/Store";

const Orange=() => {
    const oranges = useStore((state) => state.oranges);
    const increaseOrange = useStore((state) => state.increaseOrange);
    const setOranges = useStore((state) => state.setOranges);
    const [input, setInput] = useState("");

    const isValidNumber = input !== "" && Number.isFinite(Number(input));
    const setToInput = () => {
        if (!isValidNumber) return;
        setOranges(Number(input));
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setToInput();
        }
    };

    return (
        <div className="fruit-card orange-card">
            <div className="fruit-header">
                <h2>Oranges</h2>
                <span className="fruit-count">{oranges}</span>
            </div>
            <div className="fruit-actions">
                <button onClick={increaseOrange}>+1 orange</button>
            </div>
            <div className="fruit-set">
                <label htmlFor="orange-input">Set value</label>
                <div className="fruit-input-row">
                    <input
                        id="orange-input"
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="example 15"
                    />
                    <button onClick={setToInput} disabled={!isValidNumber}>
                        Set orange value
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Orange;