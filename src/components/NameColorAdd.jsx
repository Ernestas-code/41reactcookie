import React, {useState} from 'react';
import {useStore} from "../Store/Store";

const NameColorAdd = () => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#000000");
    const addItem = useStore((state) => state.addItem);
    const handleAdd = () => {
        if (!name) return;
        addItem(name,color);
        setName("");
        setColor("#000000");
    }

    return (
        <div className= "namecolor-card">
            <div className="namecolor-row">
                <input type="text"
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                />
                <button onClick={handleAdd}>Add</button>
            </div>

        </div>
    );
};

export default NameColorAdd;