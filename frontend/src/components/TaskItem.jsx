const TaskItem = ({ task, onToggle, onDelete }) => {
  const { _id, title, completed } = task;

  return (
    <li className={`task-item ${completed ? 'is-completed' : ''}`}>
      <label className="task-item-label">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(_id, !completed)}
        />
        <span className="task-title">{title}</span>
      </label>

      <button
        type="button"
        className="task-delete"
        onClick={() => onDelete(_id)}
        aria-label={`Delete "${title}"`}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
