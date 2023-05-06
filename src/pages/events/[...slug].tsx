import EventList from '@/components/events/EventList'
import ResultsTitle from '@/components/events/ResultsTitle'
import Button from '@/components/ui/Button'
import ErrorAlert from '@/components/ui/ErrorAlert'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Event } from '@/types/eventTypes'
import { getFilteredEvents } from '@/helpers/apiUtils'
import classes from '@/components/ui/error-alert.module.css'
/**
 * This page will only be rendered if there is more than one dynamic path param pass in
 * I.e. events/1/2
 * This is known as a catch all route
 * */

interface FilteredEventsPageProps {
  events: Event[]
  date: {
    year: number
    month: number
  }
  hasError: boolean
}

const FilteredEventsPage = (props: FilteredEventsPageProps) => {
  const { date, events, hasError } = props

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className={classes.center}>
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = events

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className={classes.center}>
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <ResultsTitle date={new Date(date.year, date.month - 1)} />
      <EventList events={filteredEvents} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context
  let filteredData: string[] | undefined
  let filteredYear: number
  let filteredMonth: number

  if (!params) {
    return {
      props: {
        hasError: true,
      },
    }
  } else {
    filteredData = params.slug as string[]
    filteredYear = +filteredData[0]
    filteredMonth = +filteredData[1]
  }

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  })

  return {
    props: {
      events: filteredEvents,
      date: {
        year: filteredYear,
        month: filteredMonth,
      },
    },
  }
}

export default FilteredEventsPage
