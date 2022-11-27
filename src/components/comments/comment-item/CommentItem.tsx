import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchAddCascadeComments, fetchCascadeComments } from '../../../redux/actions/cascadeComments'
import { TypeComment } from '../../../types'

import arrow from '../../../assets/icons/down-arrow-svgrepo-com.svg'

import styles from './CommentItem.module.scss'

export const CommentItem:React.FC<TypeComment> = ({id, title, value, setValue}) => {
  const dispatch = useAppDispatch()
  const [showAddComments, setShowAddComments] = useState<boolean | number>(false)
  const [hide, setHide] = useState(false)
  const cascadeComments = useAppSelector(state => state.cascadeComments.cascadeComments)

  const addToCascadeComment = () => {
    const newCascadeComment:any = {
      id:Date.now(),
      title:value
    }
    dispatch(fetchAddCascadeComments(newCascadeComment))

    setValue('')
    setHide(false)
  }

  useEffect(() => {
    dispatch(fetchCascadeComments())
  }, [])

  return (
    <div className={styles.comment__item}>
      <div style={{display:'flex', alignItems:'center'}}>
        {cascadeComments.length ? <img width={10} height={10} src={arrow} alt="" onClick={() => setShowAddComments(id)} className={styles['comment__item-answer']}/> : null}
        <p style={{marginLeft:10}} className={styles['comment__item-title']}>{title}</p>
      </div>
      <p style={{cursor:'pointer', fontSize:13, marginLeft:20}} onClick={() => setHide(!hide)}>ответить</p>
      {showAddComments && (
        <div>
          {cascadeComments.length > 0 ? cascadeComments.map((casComm:TypeComment) => (
            <div style={{marginLeft:casComm.title.length === 3 ? 20 : 0, marginTop:20}} className={styles['comment__item-subtitle']}>
              <div style={{display:'flex', alignItems:'center'}}>
                {<img width={10} height={10} src={arrow} alt="" style={{marginRight:10}} onClick={() => setShowAddComments(false)} className={styles['comment__item-answer']}/>}
                <p>{casComm.title}</p>
              </div>
              <p style={{cursor:'pointer', fontSize:13, marginLeft:15}} onClick={() => setHide(!hide)}>ответить</p>
            </div>
          )) : null}
        </div>
      )}
      {hide && <div>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={addToCascadeComment}>Добавить</button>
      </div>}
    </div>
  )
}
