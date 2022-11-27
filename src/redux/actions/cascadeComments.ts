import axios from 'axios';
import { TypeComment } from './../../types/index';

export const fetchAddCascadeComments = (cascadeComment:TypeComment) => async (dispatch:any) => {
  await axios.post('http://localhost:3001/cascadeComments', cascadeComment).then(({data}) => {
    dispatch(addCasecadeComments(data));
  })
}

export const fetchCascadeComments = () => async (dispatch:any) => {
  await axios.get('http://localhost:3001/cascadeComments').then(({data}) => {
    dispatch(setCasecadeComments(data));
  })
}

const setCasecadeComments = (items:TypeComment[]) => ({
  type:'SET_CASECADE_COMMENTS',
  payload:items
})

const addCasecadeComments = (commentCacsade:TypeComment) => ({
  type:'SET_ADD_CASECADE_COMMENTS',
  payload:commentCacsade
})