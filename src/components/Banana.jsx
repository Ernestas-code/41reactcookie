import React, { useState } from "react";
import { useStore} from "../Store/Store";

const Banana=()=> {
    const bananas = useStore((state) => state.bananas);
    const increaseBanana = useStore((state) => state.increaseBanana);
    const setBananas = useStore((state) => state.setBananas);
    const [input, setInput] = useState("");

    const isValidNumber = input !== "" && Number.isFinite(Number(input));
    const setToInput = () => {
        if (!isValidNumber) return;
        setBananas(Number(input));
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setToInput();
        }
    };

    return (
        <div className="fruit-card banana-card">
            <div className="fruit-header">
                <h2>Bananas</h2>
                <span className="fruit-count">{bananas}</span>
            </div>
            <div className="fruit-actions">
                <button onClick={increaseBanana}>+1 banana</button>
            </div>
            <div className="fruit-set">
                <label htmlFor="banana-input">Set value</label>
                <div className="fruit-input-row">
                    <input
                        id="banana-input"
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="example 10"
                    />
                    <button onClick={setToInput} disabled={!isValidNumber}>
                        Set banana value
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Banana