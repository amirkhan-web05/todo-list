import axios from 'axios';
import { TypeItems } from './../../types/index';

export const fetchTodos = () => async (dispatch:any) => {
  try {
    await axios.get('http://localhost:3001/todos').then(({data}) => {
      dispatch(setTodos(data))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const fetchAddTodos = (todos:TypeItems) => async (dispatch:any) => {
  try {
    await axios.post('http://localhost:3001/todos', todos).then(() => {
      dispatch(addTodo(todos))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const fetchRemoveTodos = (id:number) => async (dispatch:any) => {
  try {
    await axios.delete(`http://localhost:3001/todos/${id}`).then(() => {
      dispatch(removeTodo(id))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const fetchToggleTodos = (id:number, completed:boolean) => async (dispatch:any) => {
  try {
    await axios.patch(`http://localhost:3001/todos/${id}`, {
      completed:!completed
    }).then(() => {
      dispatch(toggleTodo(id, completed))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const setTodos = (todos:TypeItems[]) => ({
  type: 'SET_TODOS',
  payload:todos,
});

export const addTodo = (todos:TypeItems) => ({
  type: 'ADD_TODO',
  payload: todos
});

export const removeTodo = (id:number) => ({
  type: 'REMOVE_TODO',
  payload: id,
});

export const toggleTodo = (id:number, completed:boolean) => ({
  type: 'TOGGLE_TODO',
  payload: {id, completed},
});

