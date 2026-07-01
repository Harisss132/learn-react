import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ExperimentEffect from './components/EffectExperiment/EffectExperiment'
import Stopwatch from './components/StopWatch/Stopwatch'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)