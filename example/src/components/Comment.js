import React from 'react'
import Test from './Test'
import TestClass from './TestClass'

function Comment({ comment, deleteComment }) {
  return (
    <p>
      <span>{comment.text}</span>
      <button onClick={() => deleteComment(comment.id)}>X</button>
      <Test title={comment.text} />
      <TestClass title={comment.text} />
    </p>
  )
}

export default Comment
