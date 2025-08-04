import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList }) => {
  // console.log(todoList);
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
