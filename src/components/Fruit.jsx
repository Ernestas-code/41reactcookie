import React, { useState } from "react";

const fruits = [
    { id: "frt_a1b2", name: "Apple", emoji: "🍎" },
    { id: "frt_k9x4", name: "Banana", emoji: "🍌" },
    { id: "frt_u7n8", name: "Grapes", emoji: "🍇" },
    { id: "frt_z3q1", name: "Watermelon", emoji: "🍉" },
    { id: "frt_m6r5", name: "Pineapple", emoji: "🍍" },
    { id: "frt_t8j2", name: "Peach", emoji: "🍑" },
    { id: "frt_v4p9", name: "Cherry", emoji: "🍒" },
    { id: "frt_x1w6", name: "Strawberry", emoji: "🍓" },
    { id: "frt_y7l0", name: "Lemon", emoji: "🍋" },
    { id: "frt_n2d3", name: "Kiwi", emoji: "🥝" },
];

const FruitTransfer = () => {
    const [availableFruits, setAvailableFruits] = useState(fruits);
    const [selectedFruits, setSelectedFruits] = useState([]);

    const transferFruit = (fruit) => {
        setAvailableFruits((prev) => prev.filter((f) => f.id !== fruit.id));
        setSelectedFruits((prev) => [...prev, fruit]);
    };

    const removeFruit = (fruit) => {
        setSelectedFruits((prev) => prev.filter((f) => f.id !== fruit.id));
        setAvailableFruits((prev) => [...prev, fruit]);
    };

    return (
        <div className="flex">

            <div className="w-1/4 p-4 bg-gray-100 min-h-screen">
                <h2 className="text-xl font-bold mb-4">Fruits</h2>
                <div className="grid grid-cols-2 gap-4">
                    {availableFruits.map((fruit) => (
                        <button
                            key={fruit.id}
                            onClick={() => transferFruit(fruit)}
                            className="flex flex-col items-center p-3 bg-white rounded-lg shadow hover:bg-blue-50 transition"
                        >
                            <span className="text-3xl">{fruit.emoji}</span>
                            <span className="mt-2 text-sm">{fruit.name}</span>
                        </button>
                    ))}
                </div>
            </div>


            <div className="flex-1 p-4">
                <h2 className="text-2xl font-semibold mb-4">Selected Fruits</h2>
                {selectedFruits.length === 0 ? (
                    <p className="text-gray-500">No fruits selected yet.</p>
                ) : (
                    <div className="grid grid-cols-4 gap-4">
                        {selectedFruits.map((fruit) => (
                            <div
                                key={fruit.id}
                                className="relative p-3 bg-green-50 rounded-lg shadow flex flex-col items-center"
                            >
                                <button
                                    onClick={() => removeFruit(fruit)}
                                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                                    title="Remove"
                                >
                                    ×
                                </button>
                                <span className="text-3xl">{fruit.emoji}</span>
                                <span className="mt-2 text-sm">{fruit.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FruitTransfer;