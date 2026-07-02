import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserList from './UserList/UserList'
import FetchListUser from './UserPost/UserPost'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FetchListUser/>
  </StrictMode>,
)
