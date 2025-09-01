import React from 'react';

const UserList = ({users}) => {
    return (
        <div style={{ flexGrow: 1 }}>
            <h2>User Cards</h2>
            {users.length === 0 ? (
                <p>No users added yet.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                    {users.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "15px",
                                borderRadius: "8px",
                                width: "180px",
                                backgroundColor: "#f9f9f9",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            }}
                        >
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Age:</strong> {user.age}</p>
                            <p><strong>City:</strong> {user.city}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserList;
