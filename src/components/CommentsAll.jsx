import React, {useEffect, useState} from 'react';

const CommentsAll = ({onSelect}) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments")
            .then((res) => res.json())
            .then((data) => setComments(data.slice(0, 10)));
    }, []);
    return (
        <div style={{width: "50%"}}>
            <h2>All comments</h2>
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    onClick={() => onSelect(comment.id)}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px",
                        cursor: "pointer",
                    }}
                >
                    <h4>{comment.name}</h4>
                    <p>{comment.email}</p>
                </div>
            ))}
        </div>
    );
};


export default CommentsAll;