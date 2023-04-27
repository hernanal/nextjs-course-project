import EventContent from '@/components/event-detail/EventContent'
import EventLogistics from '@/components/event-detail/EventLogistics'
import EventSummary from '@/components/event-detail/EventSummary'
import ErrorAlert from '@/components/ui/ErrorAlert'
import { getEventById } from '@/dummy-data'
import { useRouter } from 'next/router'

const EventDetailPage = () => {
  const router = useRouter()
  const eventId = router.query.eventId
  const event = getEventById(eventId)

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

export default EventDetailPage
