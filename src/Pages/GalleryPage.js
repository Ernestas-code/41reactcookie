import React, { useEffect, useState } from 'react';

const GalleryPage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('https://picsum.photos/v2/list?page=1&limit=12')
            .then((res) => res.json())
            .then((data) => setImages(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Gallery</h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '10px',
                    marginTop: '20px',
                }}
            >
                {images.map((img) => (
                    <div key={img.id} style={{ overflow: 'hidden', borderRadius: '8px' }}>
                        <img
                            src={`https://picsum.photos/id/${img.id}/300/200`}
                            alt={img.author}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;