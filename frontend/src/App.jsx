import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { getTasks, createTask, updateTask, deleteTask } from './api.js';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all tasks once, when the page first loads.
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAddTask = async (title) => {
    const newTask = await createTask(title);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggle = async (id, completed) => {
    const updated = await updateTask(id, { completed });
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <main className="app">
      <header className="app-header">
        <h1>To-Do List</h1>
        <p>{remaining} task{remaining === 1 ? '' : 's'} remaining</p>
      </header>

      <TaskForm onAddTask={handleAddTask} />

      {error && <p className="error-banner">⚠ {error} — is the backend server running?</p>}

      {loading ? (
        <p className="loading-state">Loading tasks…</p>
      ) : (
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </main>
  );
};

export default App;
