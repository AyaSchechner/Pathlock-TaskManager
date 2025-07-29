import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TaskItem } from './types';
import { FaTrash } from 'react-icons/fa';
import './App.css';
import confetti from 'canvas-confetti';


const API_URL = 'http://localhost:5167/api/tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [completionMessage, setCompletionMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get<TaskItem[]>(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newDescription.trim()){
      setErrorMessage("Task description cannot be empty.");
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    if (newDescription.length > 100) {
      setErrorMessage("Task description cannot exceed 100 characters.");
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    try {
      await axios.post(API_URL, {
        description: newDescription,
        isCompleted: false,
      });
      setNewDescription('');
      fetchTasks(); // Refresh the list
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const toggleTask = async (task: TaskItem) => {
    try {
      const updatedTask = {
        ...task,
        isCompleted: !task.isCompleted,
      };

      await axios.put(`${API_URL}/${task.id}`, updatedTask);

      if (!task.isCompleted) {
        setCompletionMessage(` Nice job! "${task.description}" marked as completed.`);
        
        // Launch confetti
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });

        setTimeout(() => setCompletionMessage(''), 3000);
            }
      
      fetchTasks(); // Refresh tasks after toggling
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };
  
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks(); // Refresh list after deletion
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };
  
  const filteredTasks = () => {
    return tasks.filter((task) => {
      if (filter === 'active') return !task.isCompleted;
      if (filter === 'completed') return task.isCompleted;
      return true;
    });
  };
  

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container py-4">
      <div className="card p-4 shadow" style={{ backgroundColor: '#fef9ff' }}>
        <h1 className="text-center text-white py-3 rounded" style={{ backgroundColor: '#926fca' }}>
          Task Manager
        </h1>

        {/* Completion Message Alert */}
        {completionMessage && (
          <div className="custom-toast alert alert-success text-center">
            {completionMessage}
          </div>
        )}

        {/* Error Message Alert */}
        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          
          </div>
        )}

        {/* Add Task */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask();
              }
            }}
            placeholder="Add a new task"
          />
          <button className="btn text-white" style={{ backgroundColor: '#926fca' }} onClick={addTask}>
            Add
          </button>
        </div>
        {/* Filter Buttons */}
        <div className="mb-3 d-flex gap-2 justify-content-center">
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-outline-secondary ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`btn btn-outline-secondary ${filter === 'active' ? 'active' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`btn btn-outline-secondary ${filter === 'completed' ? 'active' : ''}`}
          >
            Completed
          </button>
        </div>
  
        {/* Incomplete Task Count */}
        <h5 className="mb-3">
          Active Tasks{' '}
          <span className="badge bg-secondary">
            {tasks.filter((task) => !task.isCompleted).length}
          </span>
        </h5>
  
        {/* Task List */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredTasks().length === 0 ? (
          <div className="alert alert-dark">No tasks to show.</div>
        ) : (
          <ul className="list-group">
            {filteredTasks()
              .sort((a, b) => {
                if (a.isCompleted !== b.isCompleted) {
                  return Number(a.isCompleted) - Number(b.isCompleted);
                }
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
              })
              .map((task) => (
                <li
                  key={task.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    task.isCompleted ? 'bg-light text-muted' : ''
                  }`}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleTask(task)}
                      id={`task-${task.id}`}
                      title={task.isCompleted ? "Mark active" : "Mark completed"}
                    />
                    <label
                      className="form-check-label ms-2 text-wrap text-break"
                      htmlFor={`task-${task.id}`}
                      style={{ wordBreak: 'break-word' }}
                    >
                      {task.description}
                    </label>

                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
  
};

export default App;
