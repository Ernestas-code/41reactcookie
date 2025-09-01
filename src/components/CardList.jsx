import React from 'react';

const CardList = ({ cards }) => {
    return (
        <div style={{ marginTop: 20 }}>
            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Input</th>
                    <th>Time Created</th>
                </tr>
                </thead>
                <tbody>
                {cards.map((card, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{card.text}</td>
                        <td>{card.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CardList;