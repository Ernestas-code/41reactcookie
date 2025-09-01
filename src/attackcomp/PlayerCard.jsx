import React from 'react';

const Player = ({data}) => {
    const { hp, coins, potions } = data;
    const getHealthColor = (hp) => {
        if (hp > 60) return 'green';
        if (hp > 30) return 'orange';
        return 'red';
    };
    return (
        <div>
            <h2>Player</h2>
            <img src='https://png.pngtree.com/png-clipart/20230913/original/pngtree-slay-clipart-cartoon-image-of-a-warrior-girl-vector-png-image_11076801.png' alt="Player" width="120" />
            <div style={{ width: 150, height: 20, border: '1px solid #000', margin: '10px auto' }}>
                <div
                    style={{
                        width: `${hp}%`,
                        height: '100%',
                        backgroundColor: getHealthColor(hp),
                        transition: 'width 0.3s ease',
                    }}
                ></div>
            </div>
            <p>HP: {hp}</p>
            <p>Coins: {coins}</p>
            <p>Potions : {potions}</p>


        </div>
    );
};

export default Player;