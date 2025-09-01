import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function AndriusCodeRouter() {

    const [bgColor, setBgColor] = useState('white');
const [getNum, setNum] = useState(0);
function twoPoints () {
    setNum(getNum+2)
}
    return (
        <div className="App">

            <div style={{padding: '40px', textAlign: 'center' ,backgroundColor: bgColor
            }}>
                <div
                    style={{
                        width: '200px',
                        height: '200px',
                        margin: '0 auto 20px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        transition: 'background-color 0.3s'
                    }}
                />
                <div style={{display: 'flex', justifyContent: 'end', gap: '10px'}}>
                    <button onClick={() => setBgColor('red')}>Change background color</button>
                    <button onClick={() => twoPoints()}>2 points per click</button>
                    <button onClick={() => setBgColor('yellow')}>3 points per click</button>
                    <button onClick={() => setBgColor('yellow')}>change cookie image</button>
                    <button onClick={() => setBgColor('yellow')}>make cookie spin</button>

                </div>
            </div>
        </div>
    );
}

export default App;
