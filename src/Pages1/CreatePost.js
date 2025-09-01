import React, {useState} from "react";
function CreatePost({ secretKey }) {
    const [formData, setFormData] = useState({ title: "", image: "", description: "" });
    const [msg, setMsg] = useState(""); const [err, setErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); setMsg(""); setErr("");
        try {
            const res = await fetch("http://156.67.83.41:1111/createpost", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secretKey, ...formData }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            setMsg(data.message);
            setFormData({ title: "", image: "", description: "" });
        } catch (error) { setErr(error.message); }
    };

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Title" value={formData.title}
                       onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                <input placeholder="Image URL" value={formData.image}
                       onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
                <textarea placeholder="Description" value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                <button type="submit">Post</button>
            </form>
            {msg && <p style={{ color: "green" }}>{msg}</p>}
            {err && <p style={{ color: "red" }}>{err}</p>}
        </div>
    );
}
export default CreatePost;