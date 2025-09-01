import React from 'react';
import NameColorList from "./components/NameColorList";
import NameColorAdd from "./components/NameColorAdd";
import "./App.css";
const ColorNameAdd = () => {
    return (
        <div style={{ padding: "20px" }}>
            <NameColorAdd />
            <NameColorList />
        </div>
    );
};

export default ColorNameAdd;