import { Event } from '@/types/eventTypes'

interface EventProps {
  event: Event
}

const EventItem = ({ event }: EventProps) => {
  return (
    <li>
      <img src={event.image} alt={event.title} />
      <div>
        <div>
          <h2>{event.title}</h2>
          <div>
            <time>{event.date}</time>
          </div>
          <div>
            <address>{event.location}</address>
          </div>
        </div>
        <div>
          <button>Explore Event</button>
        </div>
      </div>
    </li>
  )
}

export default EventItem
