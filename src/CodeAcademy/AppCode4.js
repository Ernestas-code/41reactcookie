import React, {useEffect, useState} from 'react';

const AppCode4 = () => {
    const [getUsers, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);

                console.log(data);
            })
    }, []);
    return (
        <div>
            {getUsers.map((data) => (
                <ul key={data.name}>
                    <li >{data.name}</li>
                </ul>
            ))}
        </div>
    );
};

export default AppCode4;