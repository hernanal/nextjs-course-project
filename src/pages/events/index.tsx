import EventList from '@/components/events/EventList'
import EventsSearch from '@/components/events/EventsSearch'
import { getAllEvents } from '@/helpers/apiUtils'
import { useRouter } from 'next/router'
import { Event } from '@/types/eventTypes'

interface EventsPageProps {
  events: Event[]
}

const EventsPage = (props: EventsPageProps) => {
  const router = useRouter()
  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={props.events} />
    </div>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents()

  return {
    props: {
      events,
    },
    revalidate: 60,
  }
}

export default EventsPage
