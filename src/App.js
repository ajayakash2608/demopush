import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';

const API_URL = 'http://localhost:5000/todos';  // Backend API URL

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: filter === 'all' ? {} : { status: filter }
      });
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post(API_URL, todo);
      setTodos([...todos, response.data]);
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedTodo._id}`, updatedTodo);
      setTodos(todos.map(todo => (todo._id === updatedTodo._id ? response.data : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <div className="filter-buttons">
        <button className="filter-all" onClick={() => setFilter('all')}>All</button>
        <button className="filter-completed" onClick={() => setFilter('completed')}>Completed</button>
        <button className="filter-not-completed" onClick={() => setFilter('not completed')}>Pending</button>
      </div>
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
