import axios from 'axios';
import { TypeItems } from './../../types/index';

export const fetchSubTodos = () => async (dispatch:any) => {
  try {
    await axios.get('http://localhost:3001/subtodos').then(({data}) => {
      dispatch(setSubTodos(data))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const fetchSubAddTodos = (subtodos:TypeItems) => async (dispatch:any) => {
  try {
    await axios.post('http://localhost:3001/subtodos', subtodos).then(() => {
      dispatch(addSubTodo(subtodos))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const fetchRemoveSubTodos = (id:number) => async (dispatch:any) => {
  try {
    await axios.delete(`http://localhost:3001/subtodos/${id}`).then(() => {
      dispatch(removeSubTodo(id))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const fetchToggleSubTodos = (id:number, completed:boolean) => async (dispatch:any) => {
  try {
    await axios.patch(`http://localhost:3001/subtodos/${id}`, {
      completed:!completed
    }).then(() => {
      dispatch(toggleSubTodo(id, completed))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const setSubTodos = (todos:TypeItems[]) => ({
  type: 'SET_SUBTODOS',
  payload:todos,
});

export const addSubTodo = (todos:TypeItems) => ({
  type: 'ADD_SUBTODO',
  payload: todos
});

export const removeSubTodo = (id:number) => ({
  type: 'REMOVE_SUBTODO',
  payload: id,
});

export const toggleSubTodo = (id:number, completed:boolean) => ({
  type: 'TOGGLE_SUBTODO',
  payload: {id, completed},
});

