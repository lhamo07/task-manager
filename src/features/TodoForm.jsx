import React, { useState } from 'react';
import { useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';
const StyledButton = styled.button`
  background-color: #18446b !important;
  color: white;
  padding: 5px;
  border-radius: 5px;
  border: none;
  margin-left: 5px;
  
  &:disabled {
    font-style: italic;
    background-color: grey !important;
    &:hover {
    background-color: #0f2a3e !important;
  }
`;

const TodoForm = ({ onAddTodo, isSaving }) => {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  const todoTitleInput = useRef();
  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  };
  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => {
          setWorkingTodoTitle(event.target.value);
        }}
        elementId="todoTitle"
        labelText="Todo"
      />

      <StyledButton type="submit" disabled={workingTodoTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </StyledButton>
    </form>
  );
};

export default TodoForm;
