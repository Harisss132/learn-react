import React from "react";
import { useState, useEffect } from "react";

function ExperimentEffect() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    useEffect(() => {
        console.log('EFFECT TANPA DEPENDENCY ARRAY');
    });

    useEffect(() => {
        console.log('EFFECT DENGAN [] - SEKALI SAJA');
    }, []);
    useEffect(() => {
        console.log('EFFECT DENGAN [count] - saat count berubah', count);
    }, [count]);
    useEffect(() => {
        console.log('EFFECT DENGAN [text] - saat count berubah', text);
    }, [text]);


    function handleIncrement() {
        setCount(prev => prev + 1);
    }

    return (
        <div className="container">
            <h1>Experiment Effect</h1>
            <p>{count}</p>
            <button onClick={handleIncrement}>Tambah</button>
            <label htmlFor="">Ketik</label>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text}/>
        </div>
    )
}

export default ExperimentEffect;