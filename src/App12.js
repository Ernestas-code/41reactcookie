import React, {useState} from 'react';
import UserForm from "./components/UserGrid";
import UserList from "./components/UserList";

const App12 = () => {
    const [users, setUsers] = useState([]);
    const addUser = (newUser) => {
        setUsers([...users, {...newUser, id: Date.now()}]);
    }
    return (<div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "30px",
                fontFamily: "Arial, sans-serif",
            }}
        >

            <div style={{width: "300px"}}>
                <UserForm onAddUser={addUser}/>
            </div>


            <div style={{flexGrow: 1, marginLeft: "40px"}}>
                <UserList users={users}/>
            </div>
        </div>
    );
};

export default App12;