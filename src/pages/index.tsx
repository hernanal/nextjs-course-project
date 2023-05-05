import EventList from '@/components/events/EventList'
import { getFeaturedEvents } from '@/helpers/apiUtils'
import { Event } from '@/types/eventTypes'

interface HomePageProps {
  events: Event[]
}

const HomePage = (props: HomePageProps) => {
  const { events } = props
  return (
    <div>
      <EventList events={events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  }
}

export default HomePage
