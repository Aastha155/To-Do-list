import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === '') {
      alert('Task cannot be empty');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
  );

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={taskInput} 
        onChange={(e) => setTaskInput(e.target.value)} 
        placeholder="Add a new task" 
      />
      <button onClick={addTask}>Add Task</button>
      <div>
        <label>
          <input 
            type="radio" 
            value="all" 
            checked={filter === 'all'} 
            onChange={() => setFilter('all')} 
          /> All
        </label>
        <label>
          <input 
            type="radio" 
            value="completed" 
            checked={filter === 'completed'} 
            onChange={() => setFilter('completed')} 
          /> Completed
        </label>
        <label>
          <input 
            type="radio" 
            value="incomplete" 
            checked={filter === 'incomplete'} 
            onChange={() => setFilter('incomplete')} 
          /> Incomplete
        </label>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <span 
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompletion(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
