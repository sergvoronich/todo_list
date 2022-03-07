import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllDoneAction } from '../store/index';

function ProgressAndRemove() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [done, setDone] = useState(0);
  const removeAllDoneHandler = () => {
    dispatch(removeAllDoneAction());
  };

  useMemo(() => {
    let counter = 0;
    todos.forEach((item) => {
      if (item.completed) counter += 1;
    });
    setDone(counter);
  }, [todos]);

  return (
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
  );
}

export default ProgressAndRemove;
