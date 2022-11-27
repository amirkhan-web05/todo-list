import React from 'react'
import { TypeItems } from '../../../types'

import editIcon from '../../../assets/icons/383148_edit_icon.svg'
import removeIcon from '../../../assets/icons/icons8-trash-can.svg'

import styles from './SubTodo.module.scss'

export const SubTodoItem:React.FC<TypeItems> = ({id, name, completed, onRemove, onToggle, onEdit, setEdit, setTodoEditing, editTodo, edit}) => {
  return (
    <div>
      {id === editTodo ? <li>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <input value={edit} onChange={(e) => setEdit!(e.target.value)} type='text'/>
          <div style={{cursor:'pointer'}} onClick={() => onEdit!(id)}>
            <img width={16} height={16} src={editIcon} alt="" />
          </div>
        </div>
      </li> : (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <li>
            <span style={{textDecoration:completed ? 'line-through' : ''}} className='subtodo__item-name'>{name}</span>
          </li>
          <div className={styles.subtodo__action}>
            <input type="checkbox" checked={completed} onChange={() => onToggle!(id, completed)}/>
            <div style={{cursor:'pointer'}} onClick={() => setTodoEditing!(id)}>
              <img width={16} height={16} src={editIcon} alt="" />
            </div>
            <div className={styles.subtodo__action}>
              <div style={{cursor:'pointer'}} onClick={() => onRemove!(id)}>
                <img width={20} height={20} src={removeIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
