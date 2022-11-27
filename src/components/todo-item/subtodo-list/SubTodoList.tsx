import React from 'react'
import { TypeItems, TypeSubTodosList } from '../../../types'
import { SubTodoItem } from '../subtodo-item/SubTodoItem'

export const SubTodoList:React.FC<any> = ({subtodos, onRemove, onToggle, edit, onEdit, setEdit, editTodo, setTodoEditing}) => {
  return (
    <ul>
      {subtodos.map((subtodo:TypeItems) => (
        <SubTodoItem 
          key={subtodo.id} 
          {...subtodo}
          onRemove={onRemove}
          onToggle={onToggle}
          edit={edit}
          onEdit={onEdit}
          setEdit={setEdit}
          editTodo={editTodo}
          setTodoEditing={setTodoEditing}
        />
      ))}
    </ul>
  )
}
