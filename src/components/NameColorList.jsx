import React from 'react';
import {useStore} from "../Store/Store";

const NameColorList = () => {
    const items = useStore((state)=> state.items);
    return (
        <div className= "namecolor-list">
            {items.map((item, index) => (
                <div
                className= "namecolor-item"
                key={index}
                style={{backgroundColor: item.color}}
                >
                    {item.name}
                </div>
            ))}


        </div>
    );
};

export default NameColorList;