import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import { TodosViewForm } from './features/TodosViewForm';
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

const encodeUrl = ({ sortField, sortDirection }) => {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

  return encodeURI(`${url}?${sortQuery}`);
};
// const encodeencodeUrl() = ({ sortField, sortDirection }) => {};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [todoRecord, setTodoRecords] = useState([]);
  const [isSaving, setIssaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      };
      try {
        const resp = await fetch(
          `${encodeUrl({ sortField, sortDirection })}`,
          options
        );
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const response = await resp.json();
        const fetchedRecord = response.records.map((record) => {
          const todo = {
            id: record.id,

            title: record.fields.title,
            isCompleted: record.fields.isCompleted,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoRecords(fetchedRecord);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, token]);

  const addTodo = async (title) => {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };

    const payload = {
      records: [
        { fields: { title: newTodo.title, isCompleted: newTodo.isCompleted } },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIssaving(true);
      const resp = await fetch(
        `${encodeUrl({ sortField, sortDirection })}`,
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      console.log(records);
      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: records[0].fields.isCompleted,
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoRecords([...todoRecord, savedTodo]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setIssaving(false);
    }
  };
  // const ff = decodeURI(
  //   'https://api.airtable.com/v0/airtable_table_id/Todos?sort%5B0%5D%5Bfield%5D=createdTime&sort%5B0%5D%5Bdirection%5D=desc'
  // );
  // console.log(ff);
  const completeTodo = (id) => {
    const updateTodo = todoRecord.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          isCompleted: true,
        };
      }
      return todo;
    });
    setTodoRecords(updateTodo);
  };
  const updateTodo = async (editedTodo) => {
    // const updatedTodos = todoRecord.map((todo) => {
    //   if (todo.id === editedTodo.id) {
    //     return { ...editedTodo };
    //   }
    //   return todo;
    // });
    // console.log(updatedTodos);
    const originalTodo = todoRecord.find((todo) => todo.id === editedTodo.id);
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(
        `${encodeUrl({ sortField, sortDirection })}`,
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = originalTodo;
      setTodoList([...revertedTodos]);
    } finally {
      setIssaving(false);
    }
  };

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoRecord}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />
      <hr></hr>
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
      />
      {errorMessage !== '' && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
