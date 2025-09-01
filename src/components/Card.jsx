import React, { useState, useRef } from 'react';

const Card = ({ photoUrl, username, email }) => {
    const inpRef = useRef();
    const [bgColor, setBgColor] = useState('white');

    function doSome() {
        const color = inpRef.current.value;
        setBgColor(color);
        console.log('Selected color:', color);
    }

    return (
        <div style={{ backgroundColor: bgColor }} className="w-80 rounded-2xl shadow-md">
            <div className="flex flex-col items-center p-4 gap-3">
                <img
                    style={{ height: '100px' }}
                    src={photoUrl}
                    alt="User"
                    className="w-24 h-24 rounded-full object-cover shadow"
                />
                <div className="text-center">
                    <h2 className="text-xl font-semibold">{username}</h2>
                    <p className="text-gray-600">{email}</p>
                </div>
                <input type="color" ref={inpRef} className="mt-2" />
                <button
                    onClick={doSome}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
                >
                    Change Background
                </button>
            </div>
        </div>
    );
};

export default Card;