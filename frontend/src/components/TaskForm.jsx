import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    setSubmitting(true);
    try {
      await onAddTask(trimmed);
      setTitle(''); // clear the input only after a successful add
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New task title"
      />
      <button type="submit" disabled={submitting || !title.trim()}>
        {submitting ? 'Adding…' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
