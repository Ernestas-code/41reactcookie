import React, { useState } from "react";
import CommentsAll from "./components/CommentsAll";
import SingleComment from "./components/SingleComment";

function App16() {
    const [selectedCommentId, setSelectedCommentId] = useState(null);

    return (
        <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
            <CommentsAll onSelect={setSelectedCommentId} />
            {selectedCommentId && <SingleComment commentId={selectedCommentId} />}
        </div>
    );
}

export default App16;