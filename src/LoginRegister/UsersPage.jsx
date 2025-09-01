import React, {useEffect,useState} from 'react';

const UsersPage = ({token}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:2500/api/users",{
                    headers : {Authorization: token},
                })
                const data = await res.json();
                setUsers(data);
            }
            catch (err) {
                console.errpr("failed to load users", err);
            }
        };
        fetchUsers();
    }, [token]);

    const poke= async (userId) => {
        try {
            const res = await fetch(`http://localhost:2500/api/poke/${userId}`, {
                method: 'POST',
                headers : {Authorization: token},
            })
            const data = await res.json();
            alert(data.message);

        }
        catch (err) {
            console.error("failed to poke users", err);
        }
    }


    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username}
                        <button onClick={() => poke(user._id)}>Poke</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;