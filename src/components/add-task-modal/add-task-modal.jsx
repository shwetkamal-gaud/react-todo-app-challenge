import * as React from 'react';
import ReactDOM from 'react-dom';
import './add-task-modal.scss';

export const AddTaskModal = ({
  isOpen, onClose, onAdd, onKeyUp,
  existingTask,
}) => {
  const [label, setLabel] = React.useState('');
  React.useEffect(() => {
    if (existingTask) {
      setLabel(existingTask.label);
    } else {
      setLabel('');
    }
  }, [existingTask]);
  if (!isOpen) {
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const task = existingTask
      ? { ...existingTask, label }
      : { id: Date.now(), label, checked: false };

    onAdd(task);
    setLabel('');
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <form onSubmit={handleSubmit} className="modal-content">
        <div className="form-header">
          <h2>Add New Task</h2>
          <button type="button" onClick={onClose} className="close-btn">
            <img src="/close.svg" alt="close-icon" width={15} height={15} />
          </button>
        </div>
        <input
          type="text"
          value={label}
          required
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter task"
          aria-label="New task description"
          onKeyUp={onKeyUp}
        />
        <div className="modal-actions">
          <button type="submit">{existingTask ? 'Update' : 'Add'}</button>
          <button className="close-button" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>,
    document.body,
  );
};
