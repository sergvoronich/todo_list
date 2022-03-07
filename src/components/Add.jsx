import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAction } from '../store/index';

function Add() {
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useDispatch();

  const addTodo = () => {
    const newEntry = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    dispatch(addTodoAction(newEntry));
    setNewTodo('');
  };
  return (
    <div className="add-block">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="button" onClick={addTodo}>+</button>
    </div>
  );
}

export default Add;
