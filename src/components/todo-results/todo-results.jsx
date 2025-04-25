import * as React from 'react';
import './todo-results.scss';
import { TodosContext } from '../../todo-context';

export const TodoResults = () => {
  const { todos } = React.useContext(TodosContext);
  const calculateChecked = () => (
    todos.filter((todo) => todo.checked).length
  );
  return (
    <h3 className="todo-results">
      {calculateChecked()}
    </h3>
  );
};
