import React from "react";
import { useState, useEffect } from "react";

function Stopwatch() {
  const [second, setSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning === true) {
      const timer = setInterval(() => {
        setSecond(prev => prev + 1)
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      return;
    }
  }, [isRunning]);

  function handleStart() {
    setIsRunning(true)
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setSecond(0);
  }

  return (
    <div className="container">
        <h1>Stop Watch</h1>
        <p>{second}</p>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Stopwatch;