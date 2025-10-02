import React from 'react';
import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import { TodosViewForm } from '../features/TodosViewForm';
import { useSearchParams } from 'react-router';
import styled from 'styled-components';
const StyleDiv = styled.div`
  margin-bottom: 17px;
`;
const TodosPage = ({
  addTodo,
  completeTodo,
  updateTodo,
  state,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const todosPerPage = 10;
  const currentPage = parseInt(searchParams.get('page') || '1', 5);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const totalPages = Math.ceil(state.todoList.length / todosPerPage);
  const currentTodos = state.todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <>
      <TodoForm onAddTodo={addTodo} isSaving={state.isSaving} />
      <TodoList
        todoList={currentTodos}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={state.isLoading}
      />
      <StyleDiv>
        <button
          disabled={currentPage <= 1}
          onClick={() => setSearchParams({ page: currentPage - 1 })}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => setSearchParams({ page: currentPage + 1 })}
        >
          Next
        </button>
      </StyleDiv>
      <TodosViewForm
        sortField={sortField}
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </>
  );
};

export default TodosPage;
