import React from 'react'
import {useState} from "react";

const App = () => {
const [bgColor, setBgColor] = useState("#ffffff");
const [logoUrl, setLogoUrl] = useState('');
const [photos, setPhotos] = useState([]);
const [links, setLinks] = useState([]);
const [newLink, setNewLink] = useState('');

const handleAddPhoto = (e) => {
    const url = prompt('Enter image URL');
    if (url) setPhotos(prev =>[...prev, url] );
}

const handleAddLink = () => {
    if (newLink.trim()) {
        setLinks (prev =>[...prev, newLink]);
        setNewLink('');
    }

}


    return (<div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial' }}>


            <div style={{ width: '250px', background: '#f4f4f4', padding: '20px' }}>
                <h3>Sidebar</h3>


                <div style={{ marginBottom: '15px' }}>
                    <label>Background Color:</label><br />
                    <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                    />
                </div>


                <div style={{ marginBottom: '15px' }}>
                    <label>Set Logo URL:</label><br />
                    <input
                        type="text"
                        placeholder="data:image/png;base64,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"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>


                <div style={{ marginBottom: '15px' }}>
                    <button onClick={handleAddPhoto}>Add Photo (via URL)</button>
                </div>


                <div>
                    <label>Add Link:</label><br />
                    <input
                        type="text"
                        placeholder="https://..."
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                    <button onClick={handleAddLink}>Add Link</button>
                </div>
            </div>


            <div style={{ flex: 1, padding: '20px', backgroundColor: bgColor }}>

                {logoUrl && (
                    <div style={{ marginBottom: '20px' }}>
                        <img src={logoUrl} alt="Logo" style={{ height: '60px' }} />
                    </div>
                )}


                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {photos.map((url, i) => (
                        <img key={i} src={url} alt={`img-${i}`} style={{ width: '150px', borderRadius: '8px' }} />
                    ))}
                </div>


                <div style={{ marginTop: '30px' }}>
                    <h3>Links</h3>
                    <ul>
                        {links.map((link, i) => (
                            <li key={i}>
                                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App