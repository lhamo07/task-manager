import React from 'react';
import { useRef } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const todoTitleInput = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = '';
    todoTitleInput.current.focus();
  };
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo </label>
      <input
        type="text"
        name="title"
        id="todoTitle"
        ref={todoTitleInput}
      ></input>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
