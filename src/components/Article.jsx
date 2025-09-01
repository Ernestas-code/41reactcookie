import React from 'react';

const Article = ({ imgUrl, title }) => {
    return (
        <div>
            <img src={imgUrl} alt="Article image" style={{ width: '300px' }} />
            <h2>{title}</h2>
        </div>
    );
};

export default Article;