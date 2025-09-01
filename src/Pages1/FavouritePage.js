import React from "react";

const FavouritePage = ({ favorites, onRemoveFavorite }) => {
    if (!favorites || favorites.length === 0)
        return <p>No favorites yet.</p>;

    return (
        <div style={{ maxWidth: "600px", margin: "auto" }}>
            <h2>My Favorites</h2>
            {favorites.map((post) => (
                <div key={post.id}
                     style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10, borderRadius: 8 }}>
                    <h3>{post.title}</h3>
                    <p><strong>By:</strong> {post.username}</p>
                    {post.image && (
                        <img src={post.image}
                             alt={post.title}
                             style={{ maxWidth: "100%" }} />
                    )}
                    <button style={{ marginTop: 10 }}
                            onClick={() => onRemoveFavorite(post.id)}>
                        Remove from Favorites
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FavouritePage;