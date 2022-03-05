import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeTodoAction, checkAction } from '../store/index';

function Todo({ item, index }) {
  const [editMode, setEditMode] = useState(false);
  const [edited, setEdited] = useState(item.title);
  const [title, setTitle] = useState(item.title);
  const dispatch = useDispatch();

  const removeTodo = (id) => {
    dispatch(removeTodoAction(id));
  };

  const titleChangeHandler = () => {
    setEditMode(!editMode);
    setTitle(edited);
  };

  const checkChangeHandler = () => {
    dispatch(checkAction(index));
  };

  const className = () => {
    if (item.completed) return 'todo completed';
    return 'todo';
  };

  return (
    <div className={className()}>
      <input
        type="checkbox"
        onChange={checkChangeHandler}
        checked={item.completed}
      />
      {editMode
        ? (
          <>
            <input
              className="edit-title"
              type="text"
              value={edited}
              onChange={(e) => setEdited(e.target.value)}
            />
            <button type="button" onClick={titleChangeHandler}>Save</button>
          </>
        )
        : (
          <>
            <p>{title}</p>
            <button type="button" onClick={titleChangeHandler}>Edit</button>
          </>
        )}
      <button type="button" onClick={() => removeTodo(item.id)}>X</button>
    </div>
  );
}

export default Todo;

Todo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
