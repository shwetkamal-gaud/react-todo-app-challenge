import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';
import { TodoResults } from '../todo-results';
import { AddTaskModal } from '../add-task-modal/add-task-modal';

export const TodoList = () => {
  const {
    todos,
    setTodos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    tasksPerPage,
    views,
    setViews,
    isModalOpen,
    setIsModalOpen,
    setTaskToEdit,
    taskToEdit,
  } = React.useContext(TodosContext);
  const [incompletePage, setIncompletePage] = React.useState(1);
  const [completedPage, setCompletedPage] = React.useState(1);
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleCheck = (id) => {
    setTodos((prev) => prev.map((todo) => (
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )));
  };
  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  const handleAddOrEdit = (task) => {
    if (taskToEdit) {
      setTodos((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTodos((prev) => [...prev, task]);
    }
    setTaskToEdit(null);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };
  const filteredTodos = todos.filter((t) => {
    const matchesSearch = t.label
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) {
      return false;
    }
    if (filter === 'completed') {
      return t.checked;
    }
    if (filter === 'incomplete') {
      return !t.checked;
    }
    return true;
  });

  const pageIncomplete = filteredTodos.filter((t) => !t.checked);
  const pageCompleted = filteredTodos.filter((t) => t.checked);
  const getPaginated = (items, page) => items.slice((page - 1) * tasksPerPage, page * tasksPerPage);

  const pagedIncomplete = getPaginated(pageIncomplete, incompletePage);
  const pagedCompleted = getPaginated(pageCompleted, completedPage);

  const totalIncompletePages = Math.max(1, Math.ceil(pageIncomplete.length / tasksPerPage));
  const totalCompletedPages = Math.max(1, Math.ceil(pageCompleted.length / tasksPerPage));
  return (
    <div className="todo-list">
      <div className="controls">
        <input
          type="text"
          placeholder="Search tasks…"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          aria-label="Search tasks"
        />

        <select defaultValue="all" onChange={(e) => setFilter(e.target.value)} className="filter-buttons">
          <option value="all">
            All
          </option>
          <option value="completed">
            Completed
          </option>
          <option value="incomplete">
            Incomplete
          </option>
        </select>

        <div className="view-toggle">
          <button type="button" onClick={() => setViews('list')} aria-pressed={views === 'list'}>
            List View
          </button>
          <button type="button" onClick={() => setViews('grid')} aria-pressed={views === 'grid'}>
            Grid View
          </button>
        </div>
      </div>
      {views === 'list' ? (
        <div className="list-container">
          <section className="list">
            <h3 className="list-header">Incomplete</h3>
            <div className="items">
              {pagedIncomplete.length > 0
                ? pagedIncomplete.map((t) => (
                  <Checkbox
                    key={t.id}
                    label={t.label}
                    checked={t.checked}
                    onClick={() => toggleCheck(t.id)}
                    onKeyUp={(e) => handleKeyUp(e, t.id)}
                    onDelete={() => handleDelete(t.id)}
                    onEdit={() => handleEdit(t)}
                  />
                ))
                : <p className="no-content">No incomplete tasks.</p>}
            </div>
            <div className="pagination">
              <button
                type="button"
                disabled={incompletePage === 1}
                onClick={() => setIncompletePage((p) => p - 1)}
              >
                Prev
              </button>
              <span>
                Page
                {incompletePage}
                of
                {totalIncompletePages || 1}
              </span>
              <button
                type="button"
                disabled={incompletePage === totalIncompletePages}
                onClick={() => setIncompletePage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </section>

          <section className="list">
            <h3 className="list-header">
              Completed
              <TodoResults />
            </h3>
            <div className="items">
              {pagedCompleted.length > 0
                ? pagedCompleted.map((t) => (
                  <Checkbox
                    key={t.id}
                    label={t.label}
                    checked={t.checked}
                    onClick={() => toggleCheck(t.id)}
                    onKeyUp={(e) => handleKeyUp(e, t.id)}
                    onDelete={() => handleDelete(t.id)}
                    onEdit={() => handleEdit(t)}
                  />
                ))
                : <p className="no-content">No completed tasks.</p>}
            </div>
            <div className="pagination">
              <button
                type="button"
                disabled={completedPage === 1}
                onClick={() => setCompletedPage((p) => p - 1)}
              >
                Prev
              </button>
              <span>
                Page
                {completedPage}
                of
                {totalCompletedPages || 1}
              </span>
              <button
                type="button"
                disabled={completedPage === totalCompletedPages}
                onClick={() => setCompletedPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className="grid-container">
          <div className="grid-items">
            <h3 className="list-header">Incomplete</h3>
            <div className="items">
              {pagedIncomplete.length > 0
                ? pagedIncomplete.map((t) => (
                  <Checkbox
                    key={t.id}
                    label={t.label}
                    checked={t.checked}
                    onClick={() => toggleCheck(t.id)}
                    onKeyUp={(e) => handleKeyUp(e, t.id)}
                    onDelete={() => handleDelete(t.id)}
                    onEdit={() => handleEdit(t)}
                  />
                ))
                : <p className="no-content">No incomplete tasks.</p>}
            </div>
            <div className="pagination">
              <button
                type="button"
                disabled={incompletePage === 1}
                onClick={() => setIncompletePage((p) => p - 1)}
              >
                Prev
              </button>
              <span>
                Page
                {incompletePage}
                of
                {totalIncompletePages || 1}
              </span>
              <button
                type="button"
                disabled={incompletePage === totalIncompletePages}
                onClick={() => setIncompletePage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>

          <div className="grid-items">
            <h3 className="list-header">
              Completed
              <TodoResults />
            </h3>
            <div className="items">
              {pagedCompleted.length > 0
                ? pagedCompleted.map((t) => (
                  <Checkbox
                    key={t.id}
                    label={t.label}
                    checked={t.checked}
                    onClick={() => toggleCheck(t.id)}
                    onKeyUp={(e) => handleKeyUp(e, t.id)}
                    onDelete={() => handleDelete(t.id)}
                    onEdit={() => handleEdit(t)}
                  />
                ))
                : <p className="no-content">No completed tasks.</p>}
            </div>
            <div className="pagination">
              <button
                type="button"
                disabled={completedPage === 1}
                onClick={() => setCompletedPage((p) => p - 1)}
              >
                Prev
              </button>
              <span>
                Page
                {completedPage}
                of
                {totalCompletedPages || 1}
              </span>
              <button
                type="button"
                disabled={completedPage === totalCompletedPages}
                onClick={() => setCompletedPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        onAdd={handleAddOrEdit}
        existingTask={taskToEdit}
      />
    </div>
  );
};
