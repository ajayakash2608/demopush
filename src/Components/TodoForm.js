import React, { useState } from 'react';

function TodoForm({ addTodo, initialTodo = {}, isEditing = false, updateTodo }) {
  const [taskName, setTaskName] = useState(initialTodo.taskName || '');
  const [description, setDescription] = useState(initialTodo.description || '');
  const [status, setStatus] = useState(initialTodo.status || 'not completed');

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { taskName, description, status, _id: initialTodo._id };
    if (isEditing) {
      updateTodo({ ...initialTodo, taskName, description, status });
    } else {
      addTodo(todo);
    }
    setTaskName('');
    setDescription('');
    setStatus('not completed');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
        style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button type="submit" className="add-task">
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}

export default TodoForm;
