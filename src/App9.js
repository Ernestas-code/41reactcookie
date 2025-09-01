import React, { useState} from "react";
import "./ChefGame.css";


const foodItems = [
    { name: "Apple", emoji: "🍎" },
    { name: "Green Apple", emoji: "🍏" },
    { name: "Pear", emoji: "🍐" },
    { name: "Peach", emoji: "🍑" },
    { name: "Cherries", emoji: "🍒" },
    { name: "Strawberry", emoji: "🍓" },
    { name: "Blueberries", emoji: "🫐" },
    { name: "Kiwi", emoji: "🥝" },
    { name: "Tomato", emoji: "🍅" },
    { name: "Coconut", emoji: "🥥" },
    { name: "Pineapple", emoji: "🍍" },
    { name: "Mango", emoji: "🥭" },
    { name: "Banana", emoji: "🍌" },
    { name: "Watermelon", emoji: "🍉" },
    { name: "Grapes", emoji: "🍇" },
    { name: "Melon", emoji: "🍈" },
    { name: "Lemon", emoji: "🍋" },
    { name: "Avocado", emoji: "🥑" },
    { name: "Carrot", emoji: "🥕" },
    { name: "Corn", emoji: "🌽" },
    { name: "Broccoli", emoji: "🥦" },
    { name: "Cucumber", emoji: "🥒" },
    { name: "Leafy Green", emoji: "🥬" },
    { name: "Potato", emoji: "🥔" },
    { name: "Sweet Potato", emoji: "🍠" },
    { name: "Onion", emoji: "🧅" },
    { name: "Garlic", emoji: "🧄" },
    { name: "Mushroom", emoji: "🍄" },
    { name: "Pizza", emoji: "🍕" },
    { name: "Bacon", emoji: "🥓" },
    { name: "Egg", emoji: "🥚" },
    { name: "Cheese", emoji: "🧀" },
    { name: "Bread", emoji: "🍞" },
    { name: "Lettuce", emoji: "🥬" },
    { name: "Hamburger", emoji: "🍔" },
    { name: "Hot Dog", emoji: "🌭" },
    { name: "Taco", emoji: "🌮" },
    { name: "Fries", emoji: "🍟" },
    { name: "Cookie", emoji: "🍪" },
];


function generateRecipe() {
    const rnd = (num) => Math.floor(Math.random() * num);
    const amount = rnd(4) + 2;
    const shuffled = [...foodItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, amount);
}


const ChefGame = () => {
    const [recipe, setRecipe] = useState(generateRecipe());
    const [table, setTable] = useState([]);
    const [message, setMessage] = useState("");
    const [dishesServed, setDishesServed] = useState(0);

    const addToTable = (item) => {
        if (table.length < recipe.length && !table.find(i => i.name === item.name)) {
            setTable((prev) => [...prev, item]);
        }
    };

    const resetTable = () => {
        setTable([]);
        setMessage("");
    };

    const checkRecipe = () => {
        if (table.length !== recipe.length) {
            setMessage("Not enough ingredients.");
            return;
        }

        const tableNames = table.map((item) => item.name);
        const allMatch = recipe.every((ingredient) =>
            tableNames.includes(ingredient.name)
        );

        if (allMatch) {
            setMessage("Recipe Complete!");
            setDishesServed((prev) => prev + 1);
            setTimeout(() => {
                setRecipe(generateRecipe());
                setTable([]);
                setMessage("");
            }, 1500);
        } else {
            setMessage("Wrong ingredients!");
        }
    };

    return (
        <div className="chef-container">

            <div className="section recipe-section">
                <div className="header-bar">
                    <h1>Make This Recipe</h1>
                    <div className="stats">Dishes Served: <strong>{dishesServed}</strong></div>
                </div>
                <div className="emoji-list">
                    {recipe.map((item, idx) => (
                        <div key={idx} className="emoji-item">
                            <div className="emoji">{item.emoji}</div>
                            <div className="label">{item.name}</div>
                        </div>
                    ))}
                </div>
                <div className="message">{message}</div>
            </div>

            <div className="section table-section">
                <h2>Table</h2>
                <div className="emoji-list">
                    {table.map((item, idx) => (
                        <div key={idx} className="emoji">{item.emoji}</div>
                    ))}
                </div>
                <button className="submit-btn" onClick={checkRecipe}>
                     Submit Dish
                </button>
                {table.length > 0 && (
                    <button className="clear-btn" onClick={resetTable}>Clear Table</button>

                )}
            </div>

            <div className="section ingredients-section">
                <h2>Ingredients</h2>
                <div className="ingredient-grid">
                    {foodItems.map((item, idx) => (
                        <button
                            key={idx}
                            className="ingredient-btn"
                            onClick={() => addToTable(item)}
                            disabled={table.find(i => i.name === item.name)}
                        >
                            <div className="emoji">{item.emoji}</div>
                            <div className="label">{item.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChefGame;