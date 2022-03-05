import { getTodosAction } from '../store/index';

export const fetchTodos = () => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((json) => dispatch(getTodosAction(json)));
};

export default fetchTodos;
