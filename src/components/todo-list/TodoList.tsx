import React from 'react'
import { TypeItems, TypeList } from '../../types'
import { TodoItem } from '../todo-item/TodoItem'

import styles from './TodoList.module.scss'

export const TodoList:React.FC<TypeList> = ({todos, onRemove, onToggle, edit, onEdit, setEdit, editTodo, setTodoEditing}) => {
  return (
    <div className={styles.todos}>
      {todos.map((todo:TypeItems) => (
        <TodoItem 
          key={todo.id} 
          {...todo} 
          onRemove={onRemove} 
          onToggle={onToggle} 
          onEdit={onEdit}
          setEdit={setEdit}
          editTodo={editTodo}
          setTodoEditing={setTodoEditing}
          edit={edit}
        />
      ))}
    </div>
  )
}
