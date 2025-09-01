import {useState, useRef} from "react";
import {findAllByDisplayValue} from "@testing-library/dom";
const cars = [
    {
        make: "Toyota",
        model: "Camry",
        year: 2021,
        color: "Silver",
        mileage: 23000,
        isElectric: false
    },
    {
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        color: "Red",
        mileage: 12000,
        isElectric: true
    },
    {
        make: "Ford",
        model: "F-150",
        year: 2020,
        color: "Blue",
        mileage: 45000,
        isElectric: false
    },
    {
        make: "BMW",
        model: "i4",
        year: 2022,
        color: "Black",
        mileage: 15000,
        isElectric: true
    },
    {
        make: "Honda",
        model: "Civic",
        year: 2019,
        color: "White",
        mileage: 60000,
        isElectric: false
    }];

const colorMap = {
    red: 'red',
    silver: '#C0C0C0',
    blue: 'skyblue',
    black: '#333',
    white: '#f0f0f0'
};
const App = () => {
    const electricCars = cars.filter(car => car.isElectric);
    const colorMap = {
        red: 'red',
        silver: '#C0C0C0',
        blue: 'skyblue',
        black: '#333',
        white: '#f0f0f0'
    };
    return (
        <div style={{ padding: '20px' }}>
            <h2>Electric Cars</h2>
            {electricCars.map((car, index) => {
                const bgColor = colorMap[car.color.toLowerCase()] || 'lightgray';

                return (
                    <div
                        key={index}
                        style={{
                            backgroundColor: bgColor,
                            color: car.color.toLowerCase() === 'black' ? 'white' : 'black',
                            padding: '15px',
                            marginBottom: '12px',
                            borderRadius: '10px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                    >
                        <h3>{car.make} {car.model}</h3>
                        <p>Year: {car.year}</p>
                        <p>Color: {car.color}</p>
                        <p>Mileage: {car.mileage} km</p>
                    </div>
                );
            })}
        </div>
    );
};

export default App;