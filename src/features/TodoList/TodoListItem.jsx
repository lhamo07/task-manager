import React, { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
const TodoListItem = ({ todo, onCompleteTodo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };
  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    if (!isEditing) {
      return;
    }

    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  };
  return (
    <li>
      <form>
        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingTitle}
              onChange={(event) => handleEdit(event)}
            />
            <button type="button" onClick={() => handleCancel()}>
              Cancel
            </button>
            <button type="Submit" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <>
            {' '}
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
            />
            <span onClick={() => setIsEditing(true)}>{workingTitle}</span>
          </>
        )}
      </form>
    </li>
  );
};

export default TodoListItem;
