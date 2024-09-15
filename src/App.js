import React, { useState } from 'react';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, _id: Date.now() }]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const filteredTodos = todos.filter(todo => 
    filter === 'all' ? true : todo.status === filter
  );

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('not completed')}>Pending</button>
      </div>
      <TodoList todos={filteredTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
