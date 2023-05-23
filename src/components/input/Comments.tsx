import { useState } from 'react'

import CommentList from './CommentList'
import NewComment from './NewComment'
import classes from './comments.module.css'

interface CommentsProps {
  eventId: string
}

function Comments(props: CommentsProps) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData: {
    email: string
    name: string
    text: string
  }) {
    // send data to API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  )
}

export default Comments
