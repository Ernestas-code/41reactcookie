import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function AndriusCodeRouter() {
    const images = [
        'https://www.gtagaming.com/images/20584/1364120785_eax.png',
        'https://staticg.sportskeeda.com/editor/2024/08/0fb83-17240056096072-1920.jpg',
        'https://e0.pxfuel.com/wallpapers/290/533/desktop-wallpaper-loadscreens-remastered-2-loading-screens-in-for-gta-san-andreas.jpg'

    ];

    const [selectedImg, setSelectedImg] = useState(images[0]);

    return (
        <div className="App" style={{ padding: '30px', textAlign: 'center' }}>
            <img src={selectedImg} alt="Selected" style={{ width: '200px', marginBottom: '20px' }} />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Option ${index}`}
                        onClick={() => setSelectedImg(img)}
                        className={selectedImg === img ? 'selected' : ''}
                        style={{ width: '100px', cursor: 'pointer' }}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
