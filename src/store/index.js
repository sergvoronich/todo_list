import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  todos, ADD, REMOVE, REMOVEALLDONE, CHECK, GET,
} from '../constants';

const reducer = (state = { todos }, action = '') => {
  switch (action.type) {
    case ADD:
      if (action.newEntry.title !== '') {
        return { todos: [...state.todos, action.newEntry] };
      }
      break;
    case GET:
      return { todos: [...state.todos, ...action.payload] };
    case REMOVE:
      return {
        todos: state.todos.filter((item) => item.id !== action.id),
      };
    case REMOVEALLDONE:
      return {
        todos: state.todos.filter((item) => !item.completed),
      };
    case CHECK:
      return {
        todos: state.todos.map((item, index) => {
          if (index === action.index) return { ...item, completed: !item.completed };
          return item;
        }),
      };
    default:
      return state;
  }

  return state;
};

export const addTodoAction = (newEntry) => ({ type: ADD, newEntry });
export const getTodosAction = (payload) => ({ type: GET, payload });
export const removeTodoAction = (id) => ({ type: REMOVE, id });
export const removeAllDoneAction = () => ({ type: REMOVEALLDONE });
export const checkAction = (index) => ({ type: CHECK, index });

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
