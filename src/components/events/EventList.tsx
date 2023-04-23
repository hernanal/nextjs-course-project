import { Event } from '@/types/eventTypes'
import EventItem from './EventItem'

interface EventListProps {
  events: Event[]
}
const EventList = ({ events }: EventListProps) => {
  return (
    <ul>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  )
}

export default EventList
