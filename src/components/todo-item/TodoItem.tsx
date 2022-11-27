import React, { useEffect, useState } from 'react'
import { TypeItems } from '../../types'

import styles from './TodoItem.module.scss'

import removeIcon from '../../assets/icons/icons8-trash-can.svg'
import editIcon from '../../assets/icons/383148_edit_icon.svg'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { SubTodoList } from './subtodo-list/SubTodoList'
import { fetchRemoveSubTodos, fetchSubAddTodos, fetchSubTodos, fetchToggleSubTodos, setSubTodos } from '../../redux/actions/subtodos'
import axios from 'axios'

export const TodoItem:React.FC<TypeItems> = ({id, name, completed, onRemove, onToggle, onEdit, edit, setEdit, editTodo, setTodoEditing}) => {
  const dispatch = useAppDispatch()
  const subtodos = useAppSelector(state => state.subtodos.subtodos)
  const [value, setValue] = useState('')
  const [show, setShow] = useState(true);

  const [subTodoEditing, setSubTodoEditing] = React.useState<null | number>(null);
  const [subEditingText, setSubEditingText] = React.useState("");
  const createdAt = new Date().toLocaleDateString();

  const addSubTodo = () => {
    const newItem:any = {
      id:Date.now(),
      name:value,
      completed:false
    }

    dispatch(fetchSubAddTodos(newItem))
  }

  const removeSubTodo = (id:number) => {
    dispatch(fetchRemoveSubTodos(id))
  }

  const toggleSubTodo = (id:number, completed:boolean) => {
    dispatch(fetchToggleSubTodos(id, completed))
  }

  const submitEdits = async (id:number) => {
    try {
      const updatedTodos = [...subtodos].map((subtodo) => {
        if (subtodo.id === id) {
          subtodo.name = subEditingText;
        }
        return subtodo;
      });
  
      setSubTodos(updatedTodos)
      setSubTodoEditing(null);
      setSubEditingText('')
  
      await axios.patch(`http://localhost:3001/subtodos/${id}`, {
        name:subEditingText
      })
    } catch (error) {
      console.log('Error', error)
    }
  }

  useEffect(() => {
    dispatch(fetchSubTodos())
  }, [])

  return (
    <div className={styles.todo__item}>
      {id === editTodo ? (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <input value={edit} onChange={(e) => setEdit!(e.target.value)} type='text'/>
          <div style={{cursor:'pointer'}} onClick={() => onEdit!(id)}>
            <img width={16} height={16} src={editIcon} alt="" />
          </div>
        </div>
      ) : (
        <div className={styles.todo__task}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3 style={{textDecoration:completed ? 'line-through' : ''}} className='todo__item-name'>{name}</h3>
            <p>{createdAt}</p>
            <div className={styles.todo__action}>
              <input type="checkbox" checked={completed} onChange={() => onToggle!(id, completed)}/>
              <div style={{cursor:'pointer'}} onClick={() => setTodoEditing!(id)}>
                <img width={16} height={16} src={editIcon} alt="" />
              </div>
              <div className={styles.todo__action}>
                <div style={{cursor:'pointer'}} onClick={() => onRemove!(id)}>
                  <img width={20} height={20} src={removeIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
      <div>
        <p style={{cursor:'pointer', marginTop:20}} onClick={() => setShow(!show)}>Добавить подзадачу</p>
        <div>
          {!show && <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder='Подзадача...' />
            <button onClick={addSubTodo}>Добавить Подзадачу</button>
          </div>}
          <SubTodoList 
            subtodos={subtodos} 
            onRemove={removeSubTodo} 
            onToggle={toggleSubTodo} 
            edit={subEditingText}
            editTodo={subTodoEditing}
            setTodoEditing={setSubTodoEditing}
            onEdit={submitEdits}
            setEdit={setSubEditingText}
          />
        </div>
      </div>
      </div>
    </div>
  )
}
