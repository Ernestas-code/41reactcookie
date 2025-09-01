import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function AndriusCodeRouter() {

    const [counter, setCounter] = useState(0);
    const [pointsPerClick, setPointsPerClick] = useState(1);
    const [bgColor, setBgColor] = useState('white');
    const [imgSpin, setImgSpin] = useState(false);
    const [imgSrc, setImgSrc] = useState('https://e7.pngegg.com/pngimages/964/816/png-clipart-chocolate-chip-cookie-fortune-cookie-biscuits-cookie-clicker-cookies-cartoon-food-baking-thumbnail.png')
    const handleClick = () => {
        setCounter(prev => prev + pointsPerClick);
    }
    const deductPoints = (points) => {
        setCounter(prev => Math.max(0, prev - points));
    }
    return (
        <div className="App" style={{backgroundColor: bgColor, padding: '30px', textAlign: 'center'}}>
            <h1>Paspaudimu: {counter}</h1>
            <h2>Taškai: {counter}</h2>
            <div style={{
                padding: '40px', textAlign: 'center', backgroundColor: bgColor
            }}>
                <img
                    id="img"
                    src={imgSrc}
                    alt="click-me"
                    onClick={handleClick}
                    className={imgSpin ? 'spin' : ''}
                    style={{width: '150px', cursor: 'pointer', transition: 'transform 0.3s'}}
                />

                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    flexWrap: 'wrap'
                }}>
                    <button onClick={() => setPointsPerClick(2)}>+2 Points/Click</button>
                    <button onClick={() => setPointsPerClick(4)}>+4 Points/Click</button>
                    <button
                        id="box3"
                        onClick={() => {
                            if (counter > 20) {
                                setImgSrc('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f16abea6-1aac-4827-b9d3-e445e01dd88c/ddk1mah-9cfc84e0-d97d-45d0-a386-8c4866e8a692.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2YxNmFiZWE2LTFhYWMtNDgyNy1iOWQzLWU0NDVlMDFkZDg4Y1wvZGRrMW1haC05Y2ZjODRlMC1kOTdkLTQ1ZDAtYTM4Ni04YzQ4NjZlOGE2OTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.NRRtxMFhh6jQLMdGuRVJlqDA23MImsUJild8D5NwLj4');
                                deductPoints(20);
                            }
                        }}
                    >
                        Change Image (20 pts)
                    </button>
                    <button
                        id="box4"
                        onClick={() => {
                            if (counter > 20) {
                                setBgColor('pink');
                                deductPoints(20);
                            }
                        }}
                    >
                        Change Background (20 pts)
                    </button>
                    <button onClick={()=>{
                        if (counter > 20) {
                            setImgSpin(true);
                            setTimeout(()=> setImgSpin(false), 10000);
                            deductPoints(20)
                        }
                    } }>make cookie spin</button>

                </div>
            </div>
        </div>
    );
}

export default App;
