import EventContent from '@/components/event-detail/EventContent'
import EventLogistics from '@/components/event-detail/EventLogistics'
import EventSummary from '@/components/event-detail/EventSummary'
import ErrorAlert from '@/components/ui/ErrorAlert'
import { getEventById } from '@/dummy-data'
import { getAllEvents } from '@/helpers/apiUtils'
import { Event } from '@/types/eventTypes'
import { GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'

interface EventDetailPageProps {
  event: Event
}

const EventDetailPage = (props: EventDetailPageProps) => {
  const event = props.event

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    )
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  let eventId: string | undefined
  let event: Event | undefined

  if (context.params) {
    eventId = context.params.eventId as string
    event = getEventById(eventId)
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const events = await getAllEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths,
    fallback: false,
  }
}

export default EventDetailPage
