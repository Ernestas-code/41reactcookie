import React, {useState, useEffect} from 'react';

const ProgressBar = ({count}) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        setProgress((count / 10) * 100);
    }, [count]);
    return (
        <div style={{ marginTop: 20 }}>
            <div style={{
                height: 24,
                background: '#ddd',
                borderRadius: 4,
                overflow: 'hidden'
            }}>
                <div
                    style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'green',
                        transition: 'width 0.3s'
                    }}
                ></div>
            </div>
            <p>{count} / 10 inputs</p>
        </div>
    );
};

export default ProgressBar;