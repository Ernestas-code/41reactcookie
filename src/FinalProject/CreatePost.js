import React, {useState} from 'react';

const CreatePost = ({currentUser, token,onBack}) => {

    const [topic, setTopic] = useState("");
    const [mood, setMood] = useState("Happy");
    const [image, setImage] = useState("");
    const [createdPost, setCreatedPost] = useState(null);

    const handleSubmit = async () => {
        if (!topic) return alert("Please enter topic");
        const res = await fetch("http://localhost:2500/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({topic, mood, image}),
        })
        const data = await res.json();
        setCreatedPost(data)
        setTopic("");
        setImage("");
    }

    return (
        <div>
            <button onClick={onBack}>⬅ Back</button>
            <h2>Create New Post</h2>
            <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={e => setTopic(e.target.value)}
            />
            <select value={mood} onChange={e => setMood(e.target.value)}>
                <option>Happy</option>
                <option>Sad</option>
                <option>Excited</option>
                <option>Angry</option>
            </select>
            <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={e => setImage(e.target.value)}
            />
            <button onClick={handleSubmit}>Create Post</button>

            {createdPost && (
                <div>
                    <h3>Post Created!</h3>
                    <p>{createdPost.content}</p>
                </div>
            )}
        </div>
    );
};

export default CreatePost;