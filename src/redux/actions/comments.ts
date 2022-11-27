import axios from 'axios';
import { TypeComment } from './../../types/index';

export const fetchComments = () => async (dispatch:any) => {
  try {
    await axios.get('http://localhost:3001/comments').then(({data}) => {
      dispatch(setComments(data))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const fetchAddComments = (comment:TypeComment) => async (dispatch:any) => {
  try {
    await axios.post('http://localhost:3001/comments', comment).then(() => {
      dispatch(addComment(comment))
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

export const setComments = (comments:TypeComment[]) => ({
  type:'SET_COMMENTS',
  payload:comments
})

export const addComment = (comment:TypeComment) => ({
  type:'ADD_COMMENT',
  payload:comment
})