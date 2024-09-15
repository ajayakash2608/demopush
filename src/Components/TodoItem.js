import React, { useState } from 'react';
import TodoForm from './TodoForm';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    deleteTodo(todo._id);
  };

  const handleStatusChange = (e) => {
    const updatedTodo = { ...todo, status: e.target.value };
    updateTodo(updatedTodo);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <TodoForm
          initialTodo={todo}
          isEditing={true}
          updateTodo={updateTodo}
        />
      ) : (
        <div>
          <h3>{todo.taskName}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.status}</p>
          <button className="edit-task" onClick={toggleEdit}>Edit</button>
          <button className="delete-task" onClick={handleDelete}>Delete</button>
          <select
            value={todo.status}
            onChange={handleStatusChange}
            className={todo.status === 'completed' ? 'status-completed' : 'status-not-completed'}
          >
            <option value="not completed">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
