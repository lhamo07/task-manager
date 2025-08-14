import { useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
function App() {
  const [todoList, setTodoList] = useState([]);
  const addTodo = (title) => {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  };
  const completeTodo = (id) => {
    const updateTodo = todoList.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          isCompleted: true,
        };
      }
      return todo;
    });
    console.log(updateTodo);
    setTodoList(updateTodo);
  };
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
