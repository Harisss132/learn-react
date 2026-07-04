import React from "react";


function Bio({ bio }) {
    return (
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{bio}</p>
    )
}

export default Bio;