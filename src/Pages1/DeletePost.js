import React, {useState} from "react";
function DeletePost({ secretKey }) {
    const [id, setId] = useState(""); const [msg, setMsg] = useState(""); const [err, setErr] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault(); setMsg(""); setErr("");
        try {
            const res = await fetch("http://156.67.83.41:1111/deletepost", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secretKey, id }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            setMsg(data.message); setId("");
        } catch (error) { setErr(error.message); }
    };

    return (
        <div>
            <h2>Delete Post</h2>
            <form onSubmit={handleDelete}>
                <input placeholder="Post ID" value={id} onChange={(e) => setId(e.target.value)} required />
                <button type="submit">Delete</button>
            </form>
            {msg && <p style={{ color: "green" }}>{msg}</p>}
            {err && <p style={{ color: "red" }}>{err}</p>}
        </div>
    );
}
export default DeletePost