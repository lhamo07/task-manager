import React from 'react';

const TodoListItem = ({ todo, onCompleteTodo }) => {
  // console.log(todo);
  return (
    <li>
      <form>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo.id)}
        />
        {todo.title}
      </form>
    </li>
  );
};

export default TodoListItem;
