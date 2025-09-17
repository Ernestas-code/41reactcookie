import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const GridSocket = () => {
    const [socket, setSocket] = useState(null);
    const [gridArray, setGridArray] = useState([]);
    const [selectedColor, setSelectedColor] = useState('#ff0000');
    const [isConnected, setIsConnected] = useState(false);

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    useEffect(() => {
        const newSocket = io('http://localhost:2500');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            setIsConnected(true);
        });

        newSocket.on('grid_initialized', (data) => {
            setGridArray(data.array);
        });

        newSocket.on('grid_updated', (data) => {
            setGridArray(data.array);
        });

        return () => newSocket.close();
    }, []);

    const handleCellClick = (index) => {
        if (socket && isConnected) {
            socket.emit('cell_clicked', { index, color: selectedColor });
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Grid game homeboy</h1>

            <div style={{ margin: '20px 0' }}>
                <span>Color: </span>
                {colors.map(color => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: color,
                            border: selectedColor === color ? '3px solid black' : '1px solid gray',
                            margin: '0 5px',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>

            <div style={{
                display: 'inline-block',
                backgroundColor: '#ddd',
                padding: '10px',
                borderRadius: '5px'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(10, 30px)',
                    gap: '2px'
                }}>
                    {gridArray.map((cell, index) => (
                        <div
                            key={index}
                            onClick={() => handleCellClick(index)}
                            style={{
                                width: '30px',
                                height: '30px',
                                backgroundColor: cell ? cell.color : 'white',
                                border: '1px solid #999',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '20px', color: isConnected ? 'green' : 'red' }}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </div>
        </div>
    );
};

export default GridSocket;