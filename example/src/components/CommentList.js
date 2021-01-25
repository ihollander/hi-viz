import React from 'react'
import Comment from './Comment'

function CommentList({ comments, deleteComment }) {
  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} deleteComment={deleteComment} />
  ))
}

export default CommentList
