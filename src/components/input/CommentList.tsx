import { NewComment } from '@/pages/api/comments/[eventId]'
import classes from './comment-list.module.css'

interface CommentListProps {
  items: NewComment[]
}

function CommentList(props: CommentListProps) {
  const { items } = props

  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id as any}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CommentList
