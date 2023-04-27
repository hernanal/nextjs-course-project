import EventList from '@/components/events/EventList'
import ResultsTitle from '@/components/events/ResultsTitle'
import Button from '@/components/ui/Button'
import ErrorAlert from '@/components/ui/ErrorAlert'
import { getFilteredEvents } from '@/dummy-data'
import { useRouter } from 'next/router'
/**
 * This page will only be rendered if there is more than one dynamic path param pass in
 * I.e. events/1/2
 * This is known as a catch all route
 * */
const FilteredEventsPage = () => {
  const router = useRouter()
  const filteredData = router.query.slug as string[]

  if (!filteredData) {
    return <p className="center">Loading...</p>
  }

  const filteredYear = +filteredData[0]
  const filteredMonth = +filteredData[1]

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <ResultsTitle date={new Date(filteredYear, filteredMonth - 1)} />
      <EventList events={filteredEvents} />
    </>
  )
}

export default FilteredEventsPage
