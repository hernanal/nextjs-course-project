import EventList from '@/components/events/EventList'
import { getAllEvents } from '@/dummy-data'

const EventsPage = () => {
  const events = getAllEvents()
  return (
    <div>
      <EventList events={events} />
    </div>
  )
}

export default EventsPage
