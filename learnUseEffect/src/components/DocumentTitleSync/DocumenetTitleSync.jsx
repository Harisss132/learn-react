import React from "react";
import { useState, useEffect } from "react";

function DocumentTitleSync() {
    const [count, setCount] = useState(0);
    const MAX_LIMIT = 50;
    const MIN_LIMIT = 0;

    useEffect(() => {
        if(count >= MAX_LIMIT) {
            document.title = `Sudah Maksimal`
        } else {
            document.title = `Counter: ${count}`
        }

        return() => {
            document.title = `learnuseeffect`
        }
    }, [count]);

    function handleIncrement() {
        if(count < MAX_LIMIT) {
            setCount(prev => prev + 1);
        }
    }

    function handleDecrement() {
        if(count > MIN_LIMIT) {
            setCount(prev => prev - 1)
        }
    }

    function handleReset() {
        setCount(0)
    }

    return (
        <div className="container">
            <h1>Experiment Title Berubah</h1>
            <button onClick={handleIncrement}>Tambah title</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleDecrement}>Kurang title</button>
        </div>
    )
}

export default DocumentTitleSync;