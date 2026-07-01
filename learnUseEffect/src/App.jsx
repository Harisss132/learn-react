import React from "react";
import { useState } from "react";
import DocumentTitleSync from "./components/DocumentTitleSync/DocumenetTitleSync";

function App() {
    const [show, setShow] = useState(true);

    return (
        <div className="container">
            <button onClick={() => setShow(prev => !prev)}>
                Toggle DocumentTitleSync
            </button>
            {show && <DocumentTitleSync />}
        </div>
    )
}

export default App;