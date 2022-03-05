import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction, removeAllDoneAction } from './store/index';
import { fetchTodos } from './asyncActions/todos';
import Todo from './components/Todo';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [done, setDone] = useState(0);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useMemo(() => {
    let counter = 0;
    todos.forEach((item) => {
      if (item.completed) counter += 1;
    });
    setDone(counter);
  }, [todos]);

  const addTodo = () => {
    const newEntry = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    dispatch(addTodoAction(newEntry));
    setNewTodo('');
  };

  const removeAllDoneHandler = () => {
    dispatch(removeAllDoneAction());
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className="content">
        <div className="add-block">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="button" onClick={addTodo}>+</button>
        </div>
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
        <div className="remove-block">
          <div className="progress-bar">
            <p className="progress-bar__text">
              <span>{done}</span>
              {' '}
              of
              {' '}
              <span>{todos.length}</span>
              {' '}
              tasks done
            </p>
            {todos.map((item) => {
              if (item.completed) {
                return <div key={item.id} className="progress-bar__item blue" />;
              }
              return <div key={item.id} className="progress-bar__item" />;
            })}
          </div>
          <button type="button" onClick={removeAllDoneHandler}>Remove all done</button>
        </div>
      </div>
    </div>
  );
}

export default App;
