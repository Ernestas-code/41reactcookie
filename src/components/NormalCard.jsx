import React, {useRef, useState} from 'react';

const NormalCard = (props) => {
    const inpRef = useRef();

    function handleColorChange() {
        const selectedColor = inpRef.current.value;
        props.call(selectedColor);
    }

    return (
        <div className="w-80 rounded-2xl shadow-md">
            <div className="flex flex-col items-center p-4 gap-3">
                <div
                    className="w-24 h-24 rounded-full object-cover shadow"
                />
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Pogba</h2>
                    <p className="text-gray-600">maikelelele@gmail.com</p>
                </div>
                <input type="color" ref={inpRef} className="mt-2"/>
                <button
                    onClick={handleColorChange}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
                >
                    Change Background
                </button>
            </div>
        </div>
    );
}

export default NormalCard;