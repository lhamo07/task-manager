import React from 'react';

const TodoForm = () => {
  return (
    <form>
      <label htmlFor="todoTitle">Todo </label>
      <input type="text" id="todoTitle"></input>
      <button type="button">Add Todo</button>
    </form>
  );
};

export default TodoForm;
