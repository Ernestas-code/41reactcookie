import React, {useState, useEffect} from 'react';

const SinglePost = ({postId, currentUser, token}) => {
    const [post, setPost] = useState({});
    const [commentText, setCommentText] = useState({});
    useEffect(() => {
        fetch(`http://localhost:2500/api/posts/${postId}`)
        .then(res => res.json())
        .then(setPost)
            .catch(console.error);
    }, [postId])

    const handleComment = async () => {
        if (!commentText) return;
        const res =await fetch(`http://localhost:2500/api/posts/${postId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({text: commentText}),
        })
        const updatedPost = await res.json();
        setPost(updatedPost);
        setCommentText("");
    }
    if (!post) return <p>Loading....</p>


    return (
        <div>
            <h2>{post.topic}</h2>
            <p><b>Mood:</b> {post.mood}</p>
            {post.image && <img src={post.image} alt="Post" style={{ maxWidth: "400px" }} />}
            <p>{post.content}</p>

            <h3>Comments</h3>
            <ul>
                {post.comments.map((c, i) => (
                    <li key={i}><b>{c.username}:</b> {c.text}</li>
                ))}
            </ul>

            {currentUser && (
                <div>
                    <textarea
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button onClick={handleComment}>Add Comment</button>
                </div>
            )}
        </div>
    );
};

export default SinglePost;