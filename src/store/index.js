import { createStore } from 'redux';
import {
  todos, ADD, REMOVE, REMOVEALLDONE, CHECK,
} from '../constants';

const reducer = (state = { todos }, action = '') => {
  if (action.type === ADD) {
    if (action.newEntry.title !== '') {
      return {
        todos: [...state.todos, action.newEntry],
      };
    }
    return state;
  }

  if (action.type === REMOVE) {
    return {
      todos: state.todos.filter((item) => item.id !== action.id),
    };
  }

  if (action.type === REMOVEALLDONE) {
    return {
      todos: state.todos.filter((item) => !item.completed),
    };
  }

  if (action.type === CHECK) {
    return {
      todos: state.todos.map((item, index) => {
        if (index === action.index) return { ...item, completed: !item.completed };
        return item;
      }),
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
