import React, { useEffect, useState } from "react";

const ReservationsPage = ({ token, onBack }) => {
    const [reservations, setReservations] = useState([]);
    const [total, setTotal] = useState(0);
const [selectedIds, setSelectedIds] = useState ([]);




    const fetchReservations = async () => {
        const res = await fetch("http://localhost:2500/api/my-reservations", {
            headers: { Authorization: token }
        });
        const data = await res.json();
        setReservations(data);
        setTotal(data.reduce((sum, p) => sum + p.price, 0));
    };

    useEffect(() => {
        fetchReservations();
    }, [token]);


    const handleSelect = (id) => {
        setSelectedIds(prev=>
        prev.includes(id)
            ? prev.filter(selectedId => selectedId !== id)
            : [...prev,id]
        )
    }
    const cancelSelected = async () => {
        if (selectedIds.length === 0) return
        try {
            await fetch(`http://localhost:2500/api/cancel-multiple`, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({productIds: selectedIds})

            });
            setSelectedIds([])
            fetchReservations()

        }
        catch (err) {
            console.error("Failed to cancel multiple",err);
        }
    }

    const cancel = async (id) => {
        await fetch(`http://localhost:2500/api/products/${id}/cancel`, {
            method: "POST",
            headers: { Authorization: token }
        });
        fetchReservations();
    };

const selectedTotal = reservations
    .filter(r => selectedIds.includes(r._id))
    .reduce((sum, r) => sum + r.price, 0)

    return (
        <div>
            <h2>My Reservations</h2>
            <button onClick={onBack}>Back to Products</button>

            {selectedIds.length > 0 && (
                <div style={{ margin: "10px 0", padding: "10px", border: "1px solid blue" }}>
                    <p>{selectedIds.length} selected (${selectedTotal})</p>
                    <button onClick={cancelSelected}>Cancel Selected</button>
                </div>
            )}

            <ul>
                {reservations.map((r) => (
                    <li key={r._id} style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(r._id)}
                            onChange={() => handleSelect(r._id)}
                            style={{ marginRight: "10px" }}
                        />
                        <img src={r.image} alt={r.title} width="80" />
                        <span style={{ margin: "0 10px" }}>{r.title} - ${r.price}</span>
                        <button onClick={() => cancel(r._id)}>Cancel</button>
                    </li>
                ))}
            </ul>
            <h3>Total Spent: ${total}</h3>
        </div>
    );
};

export default ReservationsPage;