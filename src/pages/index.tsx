import { getAllEvents } from '@/dummy-data'
import EventList from '@/components/events/EventList'

const HomePage = () => {
  const featuredEvents = getAllEvents()

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  )
}

export default HomePage
