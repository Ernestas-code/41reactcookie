import React, {useRef,useState} from 'react';
import NormalCard from "./components/NormalCard";
const App13 = () => {
    const [bgColor, setBgColor] = useState('#ffffff');
    function some(color) {
        setBgColor(color);
    }
    return (


        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>

            <div style={{
                width: '100%',
                maxWidth: '800px',
                padding: '15px',
                marginBottom: '20px',
                backgroundColor: bgColor,
                textAlign: 'center',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>

            </div>


            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <NormalCard call={some}/>
                <NormalCard call={some}/>
                <NormalCard call={some}/>
            </div>

        </div>
    );
};;

export default App13;