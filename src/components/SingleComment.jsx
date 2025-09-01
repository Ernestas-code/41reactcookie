import React, { useEffect, useState } from "react";

const SingleComment = ({ commentId }) => {
    const [comment, setComment] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
            .then((res) => res.json())
            .then((data) => setComment(data));
    }, [commentId]);

    if (!comment) return <p>Loading comment...</p>;

    return (
        <div style={{ width: "50%" }}>
            <h2>Single comment</h2>
            <div style={{ border: "1px solid blue", padding: "15px" }}>
                <h4>{comment.name}</h4>
                <p><strong>Email:</strong> {comment.email}</p>
                <p><strong>Body:</strong> {comment.body}</p>
            </div>
        </div>
    );
};

export default SingleComment;