import React from 'react';
import { useStore } from '../Store/Store';

const Toolbar1 = () => {
    const apples = useStore((state) => state.apples);
    const bananas = useStore((state) => state.bananas);
    const oranges = useStore((state) => state.oranges);

    return (
        <div className="toolbar-container">
            <div className="toolbar-row">
                <div className="toolbar-item">
                    <span className="fruit-emoji">🍎</span>
                    <span className="fruit-label">Apples: {apples}</span>
                </div>

                <div className="toolbar-item">
                    <span className="fruit-emoji">🍊</span>
                    <span className="fruit-label">Oranges: {oranges}</span>
                </div>
                <div className="toolbar-item">
                    <span className="fruit-emoji">🍌</span>
                    <span className="fruit-label">Bananas: {bananas}</span>
                </div>
            </div>
        </div>
    );
};

export default Toolbar1;
