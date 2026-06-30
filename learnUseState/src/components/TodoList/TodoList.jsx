import React from "react";
import { useState } from "react";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    function handleAdd(e) {
        e.preventDefault()
        if(inputValue === '') {
            return
        }
        const newTodos = {
            id: +new Date(),
            text: inputValue
        }
        setTodos(prev => [...prev, newTodos]);
        setInputValue('');
    }

    function handleDelete(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div className="container">
            <h1>Todo List</h1>
            <label htmlFor="">Tugas</label>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={handleAdd}>Add</button>
            {todos.length > 0 ? (
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.text} <button onClick={() => handleDelete(todo.id)}>Delete</button></li>
                ))}
            </ul>
            ) : (
                <p>Todo Kosong</p>
            )}
        </div>
    )
}

export default TodoList;