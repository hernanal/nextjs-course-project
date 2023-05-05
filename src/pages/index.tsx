import EventList from '@/components/events/EventList'
import { getFeaturedEvents } from '@/helpers/apiUtils'
import { Event } from '@/types/eventTypes'
import { GetStaticProps } from 'next'

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

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  }
}

export default HomePage
