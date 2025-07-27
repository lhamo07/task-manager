import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = () => {
  const todos = [
    { id: 1, title: 'do CDT assignments' },
    { id: 2, title: 'do laundry' },
    { id: 3, title: 'buy groceries' },
  ];
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
