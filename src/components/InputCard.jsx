import React, { useState } from 'react';

const InputCard = ({ onAdd }) => {
    const [input, setInput] = useState('');

    const handleAdd = () => {
        onAdd(input);
        setInput('');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter item"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleAdd} style={{ marginLeft: 8 }}>
                Add
            </button>
        </div>
    );
};

export default InputCard;