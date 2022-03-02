import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { REMOVE, CHECK } from '../constants';

function Todo({ item, index }) {
  const [editMode, setEditMode] = useState(false);
  const [edited, setEdited] = useState(item.title);
  const [title, setTitle] = useState(item.title);
  const dispatch = useDispatch();

  const removeTodo = (id) => {
    dispatch({ type: REMOVE, id });
  };

  const titleChangeHandler = () => {
    setEditMode(!editMode);
    setTitle(edited);
  };

  const checkChangeHandler = () => {
    dispatch({ type: CHECK, index });
  };

  return (
    <div className="todo">
      <input
        type="checkbox"
        onChange={checkChangeHandler}
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
