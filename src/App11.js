import React from 'react';
import Card from "./components/Card";

const App11 = (props) => {
    const users = [
        {
            photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            username: "johndoe",
            email: "johndoe@example.com",
            gender: "male"
        },
        {
            photoUrl: "https://randomuser.me/api/portraits/women/2.jpg",
            username: "janesmith",
            email: "janesmith@example.com",
            gender: "female"
        },
        {
            photoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
            username: "mikebrown",
            email: "mikebrown@example.com",
            gender: "male"
        },
        {
            photoUrl: "https://randomuser.me/api/portraits/women/4.jpg",
            username: "lisawhite",
            email: "lisawhite@example.com",
            gender: "female"
        },
        {
            photoUrl: "https://randomuser.me/api/portraits/men/5.jpg",
            username: "davemiller",
            email: "davemiller@example.com",
            gender: "male"
        }
    ];
    return (
        <div>
            {users.map((user, index) => (
                <Card
                    key={index}
                    photoUrl={user.photoUrl}
                    username={user.username}
                    email={user.email}
                />
            ))}
        </div>
    );
};


export default App11;