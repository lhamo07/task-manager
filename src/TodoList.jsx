import React from 'react';

const TodoList = () => {
  const todos = [
    { id: 1, title: 'do CDT assignments' },
    { id: 2, title: 'do laundry' },
    { id: 3, title: 'buy groceries' },
  ];
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
