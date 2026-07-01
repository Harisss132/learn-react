import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CounterApp from './components/Counter/Counter'
import TodoList from './components/TodoList/TodoList'
import RegisterForm from './components/RegisterForm/RegisterForm'
import ProductsApp from './components/Products/Products'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductsApp />
  </StrictMode>,
)
