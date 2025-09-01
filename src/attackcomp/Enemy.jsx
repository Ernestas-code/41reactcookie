import React from 'react';

const Enemy = ({data}) => {
    const { hp } = data;
    const getHealthColor = (hp) => {
        if (hp > 60) return 'green';
        if (hp > 30) return 'orange';
        return 'red';
    };
    return (
        <div>
            <h2>Enemy</h2>
            <img src='https://ih1.redbubble.net/image.4870959613.2233/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg' alt="Enemy" width="120" />
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
            <p>HP: {data.hp}</p>
        </div>
    );
};

export default Enemy;