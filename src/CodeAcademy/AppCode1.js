import React ,{useState} from 'react';

const AppCode1 = () => {
    const [user, setUser] = useState("Ernestas" );
    const [age, setAge] = useState(26);
    const [text, setText] = React.useState('Esu pradedantysis programuotojas');
    return (
        <div>
            <p> {user} {age} {text}</p>
        </div>
    );
};

export default AppCode1;