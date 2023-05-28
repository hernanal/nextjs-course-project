import classes from './comment-list.module.css'

interface CommentListProps {
  items: {
    _id: string
    text: string
    name: string
  }[]
}

function CommentList(props: CommentListProps) {
  const { items } = props

  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
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
