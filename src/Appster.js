import React from 'react';
import Student from "./components/Student";
import './App.css';
const Appster = () => {
    function sendPost () {
        const user = {
            username: "Ernestas",
            city: "Vilnius"
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user})
        }
        fetch("http://localhost:2500/addUser", options)
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
    }

    return (
        <div>
            <Student name="Spongebob" age= "30"  isStudent={true}/>
            <Student name="Patrick" age={42} isStudent={false}/>
            <Student name="Squidward" age={52} isStudent={false}/>
            <Student name="Sandy" age={27} isStudent={true}/>
            <button onClick={sendPost}>Send</button>
        </div>
    );
};

export default Appster;