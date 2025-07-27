import React from 'react';

const TodoListItem = ({ todo }) => {
  // console.log(todo);
  return <li>{todo.title}</li>;
};

export default TodoListItem;
