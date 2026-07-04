import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DeveloperDirectoryPage from './pages/DeveloperDirectoryPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DeveloperDirectoryPage />
  </StrictMode>,
)
