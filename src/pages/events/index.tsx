import EventList from '@/components/events/EventList'
import EventsSearch from '@/components/events/EventsSearch'
import { getAllEvents } from '@/dummy-data'
import { useRouter } from 'next/router'

const EventsPage = () => {
  const events = getAllEvents()
  const router = useRouter()
  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </div>
  )
}

export default EventsPage
