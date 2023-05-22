import EventList from '@/components/events/EventList'
import NewsletterRegistration from '@/components/input/NewsletterRegistration'
import { getFeaturedEvents } from '@/helpers/apiUtils'
import { Event } from '@/types/eventTypes'
import { GetStaticProps } from 'next'
import Head from 'next/head'

interface HomePageProps {
  events: Event[]
}

const HomePage = (props: HomePageProps) => {
  const { events } = props
  return (
    <div>
      <Head>
        <title>Events Home</title>
        <meta
          name="description"
          content="Find a list of featured events here."
        />
      </Head>
      <NewsletterRegistration />
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
