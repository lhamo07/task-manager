import { useEffect, useState } from 'react';
import './App.css';
import { useCallback } from 'react';
import style from './App.module.css';
import Logo from './assets/task.png';
import { About } from './pages/About.jsx';
import { useReducer } from 'react';
import {
  reducer as todosReducer,
  actions as todosActions,
  initialState as initialTodoState,
} from './reducers/todos.reducer.js';
import TodosPage from './pages/TodosPage.jsx';
import Header from './shared/Header.jsx';
import { Route, Routes } from 'react-router';
import NotFound from './pages/NotFound.jsx';
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [state, dispatch] = useReducer(todosReducer, initialTodoState);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [queryString, sortDirection, sortField]);
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todosActions.fetchTodos });
      const options = {
        method: 'GET',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
      };
      try {
        const resp = await fetch(`${encodeUrl()}`, options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const response = await resp.json();

        dispatch({ type: todosActions.loadTodos, records: response.records });
      } catch (error) {
        dispatch({ type: todosActions.setLoadError, error: error });
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString, token]);

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
      dispatch({ type: todosActions.startRequest });
      const resp = await fetch(`${encodeUrl()}`, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();

      dispatch({ type: todosActions.addTodo, record: records[0] });
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });
      dispatch({ type: todosActions.revertTodo, newTodo });
    } finally {
      dispatch({ type: todosActions.endRequest });
    }
  };

  const completeTodo = async (id) => {
    const originalTodos = [...state.todoList];
    const todoToUpdate = state.todoList.find((todo) => todo.id === id);

    dispatch({ type: todosActions.completeTodo, id });
    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: todoToUpdate.title,
            isCompleted: !todoToUpdate.isCompleted,
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
      const resp = await fetch(`${encodeUrl()}`, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      dispatch({ type: todosActions.revertTodo, editedTodo: originalTodos });
      dispatch({ type: todosActions.setLoadError, error });
    }
  };
  const updateTodo = async (editedTodo) => {
    const originalTodo = state.todoList.find(
      (todo) => todo.id === editedTodo.id
    );
    dispatch({
      type: todosActions.updateTodo,
      editedTodo,
    });
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
      const resp = await fetch(`${encodeUrl()}`, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });

      dispatch({ type: todosActions.revertTodo, editedTodo: originalTodo });
    }
  };
  return (
    <>
      <div className={style.title}>
        {' '}
        <img src={Logo} className={style.logo} />
      </div>
      <Header />

      <div className={style.mainContainer}>
        <Routes>
          <Route
            path="/"
            element={
              <TodosPage
                addTodo={addTodo}
                completeTodo={completeTodo}
                updateTodo={updateTodo}
                state={state}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                sortField={sortField}
                setSortField={setSortField}
                queryString={queryString}
                setQueryString={setQueryString}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {/* <TodosPage state={state} /> */}
        {state.errorMessage !== '' && (
          <div>
            <hr />
            <p className={style.errorMessage}>{state.errorMessage}</p>
            <button onClick={() => dispatch({ type: todosActions.clearError })}>
              Dismiss
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
