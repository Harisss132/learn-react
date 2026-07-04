import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UserList from './UserList/UserList'
import ProfileCard from './ProfileCard/ProfileCard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileCard />
  </StrictMode>,
)
