import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTodos } from './asyncActions/todos';
import Todo from './components/Todo';
import './App.css';
import ProgressAndRemove from './components/ProgressAndRemove';
import Add from './components/Add';

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className="content">
        <Add />
        <div className="todos-container">
          {todos.length !== 0
            ? (
              <>
                {todos.map((item, index) => (
                  <Todo
                    item={item}
                    index={index}
                    key={item.id}
                  />
                ))}
              </>
            )
            : <p>Tasks are absent</p>}
        </div>
        <ProgressAndRemove />
      </div>
    </div>
  );
}

export default App;
