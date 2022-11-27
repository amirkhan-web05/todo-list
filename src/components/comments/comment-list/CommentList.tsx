import React from 'react'
import { TypeComment, TypeCommentList } from '../../../types'
import { CommentItem } from '../comment-item/CommentItem'

export const CommentList:React.FC<TypeCommentList> = ({comments, value, setValue}) => {
  return (
    <div>
      {comments.map((comment:TypeComment) => (
        <CommentItem 
          key={comment.id} 
          {...comment}
          value={value}
          setValue={setValue}
        />
      ))}
    </div>
  )
}
