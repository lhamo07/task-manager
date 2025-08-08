import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList, onCompleteTodo }) => {
  // console.log(todoList);
  const filteredTodo = todoList.filter((todo) => !todo.isCompleted);
  return (
    <>
      {filteredTodo.length == 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodo.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
