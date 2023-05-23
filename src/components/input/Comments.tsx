import { use, useEffect, useState } from 'react'

import CommentList from './CommentList'
import NewComment from './NewComment'
import classes from './comments.module.css'

interface CommentsProps {
  eventId: string
}

function Comments(props: CommentsProps) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (showComments) {
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => setComments(data.comments))
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData: {
    email: string
    name: string
    text: string
  }) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setComments((prevComments) => prevComments.concat(data.comment))
      )
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  )
}

export default Comments
