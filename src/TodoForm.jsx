import React, { useState } from 'react';
import { useRef } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const todoTitleInput = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    // const title = event.target.title.value;
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    // event.target.title.value = '';
    todoTitleInput.current.focus();
  };
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo </label>
      <input
        type="text"
        name="title"
        id="todoTitle"
        value={workingTodoTitle}
        ref={todoTitleInput}
        onChange={(event) => {
          setWorkingTodoTitle(event.target.value);
        }}
      ></input>
      <button type="submit" disabled={workingTodoTitle === ''}>
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
