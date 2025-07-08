import './App.css';

function App() {
  const todos = [
    { id: 1, title: 'Do Code The Dream assignment' },
    { id: 2, title: 'Do laundry' },
    { id: 3, title: 'Go for work' },
  ];
  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
