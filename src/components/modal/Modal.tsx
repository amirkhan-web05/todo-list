import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchAddComments, fetchComments } from '../../redux/actions/comments'
import { fetchAddTodos, fetchRemoveTodos, fetchTodos, fetchToggleTodos, setTodos } from '../../redux/actions/todos'
import { CommentList } from '../comments/comment-list/CommentList'
import { TodoList } from '../todo-list/TodoList'

import styles from './Modal.module.scss'

export const Modal:React.FC = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todos.todos)
  const comments = useAppSelector((state:any) => state.comments.comments)
  const [value, setValue] = useState('')
  const [todoEditing, setTodoEditing] = useState<null | number>(null);
  const [editingText, setEditingText] = useState('');
  const [commentsValue, setCommentsValue] = useState('')
  const [cascadeComment, setCascadeComment] = useState('')

  const addTodo = (value:string) => {
    const newItem:any = {
      id:Date.now(),
      name:value,
      completed:false
    }

    dispatch(fetchAddTodos(newItem))

    setValue('')
  }

  const onRemoveItem = (id:number) => {
    dispatch(fetchRemoveTodos(id))
  }

  const onToggleItem = (id:number, completed:boolean) => {
    dispatch(fetchToggleTodos(id, completed))
  }

  const submitEdits = async (id:number) => {
    try {
      const updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.name = editingText;
        }
        return todo;
      });
  
      setTodos(updatedTodos)
      setTodoEditing(null);
      setEditingText('')
  
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        name:editingText
      })
    } catch (error) {
      console.log('Error', error)
    }
  }

  const addToComment = (event:React.ChangeEvent<HTMLFormElement>) => {    
    event.preventDefault()
    
    const newItem:any = {
      id:Date.now(),
      title:commentsValue
    }

    dispatch(fetchAddComments(newItem))
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  useEffect(() => {
    dispatch(fetchComments())
  }, [])

  return (
    <div className={styles.modal}>
      <div className={styles.modal__inner}>
        <div className="modal__content">
          <div className={styles.todo__add}>
            <input 
              value={value}
              onChange={e => setValue(e.target.value)}
              type="text" 
              className={styles.modal__input} 
              placeholder='Введите задачу...' 
            />
            <button onClick={() => addTodo(value)}>Добавить задачу</button>
          </div>
          <TodoList 
            todos={todos} 
            onRemove={onRemoveItem} 
            onToggle={onToggleItem} 
            edit={editingText}
            setEdit={setEditingText}
            editTodo={todoEditing}
            setTodoEditing={setTodoEditing}
            onEdit={submitEdits}
          />
          <h3>Комментарий</h3>
          <form onSubmit={addToComment} className={styles.form}>
            <div className={styles.form__comments}>
              <input 
                value={commentsValue} 
                onChange={e => setCommentsValue(e.target.value)} 
                type="text" 
                placeholder='Комментировать' 
                className={styles['form__comments-input']} 
              />
              <button type="submit">
                Добавить комментарий
              </button>
            </div>
          </form>
          <CommentList 
            comments={comments} 
            value={cascadeComment} 
            setValue={setCascadeComment}
          />
        </div>
      </div>
    </div>
  )
}
