import React from "react";
import { useState } from "react";

function CounterApp() {
    const [count, setCount] = useState(0);
    const MAX_LIMIT = 10;
    const MIN_LIMIT = 0;
    function buttonTambah() {
        if(count < 10) {
            setCount(prev => prev + 1);
        }
    }

    function buttonKurang() {
        if(count >= MIN_LIMIT) {
            setCount(prev => prev - 1)
        }
    }

    function reset() {
        setCount(0);
    }

    return (
        <div className="container">
            <p>count: {count}</p>
            {count >= MAX_LIMIT && (
                <p>Maksimum!</p>
            )}
            {count <= MIN_LIMIT && (
                <p>Minimum!</p>
            )}
            <button onClick={buttonTambah}>Tambah</button>
            <button onClick={buttonKurang}>Kurang</button>
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default CounterApp;