import { Event } from '@/types/eventTypes'
import EventItem from './EventItem'
import classes from './event-list.module.css'

interface EventListProps {
  events: Event[]
}
const EventList = ({ events }: EventListProps) => {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  )
}

export default EventList
