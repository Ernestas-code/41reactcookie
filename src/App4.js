import {useState, useRef} from "react";

const AndriusCodeRouter = () => {
    const inpRef = useRef();
    const [bgColor, setBgColor] = useState('white');
    function doSome() {
        const color = inpRef.current.value;
        setBgColor(color);
        console.log(inpRef.current.value);
    }


    return (
        <div className="App">
            <div style={{padding: '40px', textAlign: 'center'
            }}>
                <div
                    style={{
                        width: '200px',
                        height: '200px',
                        margin: '0 auto 20px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        transition: 'background-color 0.3s',
                        backgroundColor: bgColor
                    }}
                />
                <div style={{display: 'flex', justifyContent: 'end', gap: '10px'}}>
                    <input type="text" ref={inpRef} placeholder= "Enter color"/>
                    <button onClick={doSome}>Set</button>

                </div>
            </div>
        </div>
    )
}

export default App