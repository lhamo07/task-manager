import React from 'react';
import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import { TodosViewForm } from '../features/TodosViewForm';

const TodosPage = ({
  addTodo,
  completeTodo,
  updateTodo,
  state,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) => {
  return (
    <>
      <TodoForm onAddTodo={addTodo} isSaving={state.isSaving} />
      <TodoList
        todoList={state.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={state.isLoading}
      />
      <TodosViewForm
        setSortDirection={setSortDirection}
        sortDirection={sortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </>
  );
};

export default TodosPage;
