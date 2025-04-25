import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-form.scss';
import { AddTaskModal } from '../add-task-modal';

export const TodoForm = () => {
  const { setIsModalOpen, setTaskToEdit } = React.useContext(TodosContext);

  const openAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="todo-form">
      <button type="button" className="add-button" onClick={openAddModal}>
        Add Task
      </button>
    </div>
  );
};
