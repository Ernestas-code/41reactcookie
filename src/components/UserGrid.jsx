import React, {useState} from "react";

const UserForm = ({onAddUser}) => {
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const handleSubmit = () => {
        if (!username || !age || !city) return;

        onAddUser({username, age, city});
        setUsername("");
        setAge("");
        setCity("")

    };


    return (
        <div
            style={{
                display: "flex",
                padding: "20px",
                gap: "40px",
                fontFamily: "Arial, sans-serif",
            }}
        >

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "250px",
                    gap: "15px",
                }}
            >
                <h2>Add User</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{padding: "8px", fontSize: "16px"}}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{padding: "8px", fontSize: "16px"}}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{padding: "8px", fontSize: "16px"}}/>


                <button
                    onClick={handleSubmit}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                    }}
                >
                    Add User
                </button>
            </div>

        </div>

    );
}

export default UserForm;