import React, { useEffect, useState } from "react";
const GetUserPosts = ({ username}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (!username) return;
        fetch (`http://156.67.83.41:1111/getuserposts/${username}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) setPosts(data.data);
            else setPosts([]);
        })  .catch(() => setPosts([]));
    },[username]);
    if (!username) return <p>Please log in to see your posts.</p>;
    if (posts.length === 0) return <p>No posts found for user {username}</p>;
    return (
        <div>
            <h2>{username}'s Posts</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <img src={post.image} alt={post.title} width="200" />
                    <p>{post.description}</p>
                    <p>{post.id}</p>

                </div>
            ))}
        </div>
    );
};

export default GetUserPosts;