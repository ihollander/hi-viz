import React, { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const commentData = [
  {
    id: 1,
    text: '123'
  },
  {
    id: 2,
    text: '123'
  },
  {
    id: 3,
    text: '123'
  },
  {
    id: 4,
    text: '123'
  },
  {
    id: 5,
    text: '123'
  },
  {
    id: 6,
    text: '123'
  }
]

function Comments({ paused }) {
  const [comments, setComments] = useState(commentData)

  function addComment(comment) {
    setComments((comments) => {
      return [...comments, comment]
    })
  }

  function deleteComment(id) {
    setComments((comments) => {
      return comments.filter((comment) => comment.id !== id)
    })
  }

  return (
    <div>
      <h2>Comments:</h2>
      <CommentList comments={comments} deleteComment={deleteComment} />
      <CommentForm addComment={addComment} paused={paused} />
    </div>
  )
}

export default Comments
