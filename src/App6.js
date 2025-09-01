import React, { useState } from 'react';

const App = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ color: '', name: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        if (form.color && form.name) {
            setItems(prev => [...prev, form]);
            setForm({ color: '', name: '' }); // clear inputs
        }
    };

    return (
        <div style={{ padding: '30px' }}>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={form.color}
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleAdd}>Add</button>
            </div>

            {items.length > 0 && (
                <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th>Color</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((obj, index) => (
                        <tr key={index}>
                            <td style={{ backgroundColor: obj.color }}>{obj.color}</td>
                            <td>{obj.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default App;