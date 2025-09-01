import React from 'react';
import Apple from './components/Apple'
import Banana from "./components/Banana";
import Orange from "./components/Orange";
import Toolbar1 from "./components/Toolbar1";
import "./App.css";
const MainPage = () => {
    return (
        <>
            <Toolbar1/>
            <div className="fruit-container">
                <Apple/>
                <Orange/>
                <Banana/>
            </div>
        </>
    );
};

export default MainPage;