import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CounterApp from './components/Counter/Counter'
import TodoList from './components/TodoList/TodoList'
import RegisterForm from './components/RegisterForm/RegisterForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegisterForm />
  </StrictMode>,
)
