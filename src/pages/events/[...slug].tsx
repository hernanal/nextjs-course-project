import EventList from '@/components/events/EventList'
import ResultsTitle from '@/components/events/ResultsTitle'
import Button from '@/components/ui/Button'
import ErrorAlert from '@/components/ui/ErrorAlert'
// import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Event } from '@/types/eventTypes'
// import { getFilteredEvents } from '@/helpers/apiUtils'
import classes from '@/components/ui/error-alert.module.css'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import Head from 'next/head'
/**
 * This page will only be rendered if there is more than one dynamic path param pass in
 * I.e. events/1/2
 * This is known as a catch all route
 * */

// interface FilteredEventsPageProps {
//   events: Event[]
//   date: {
//     year: number
//     month: number
//   }
//   hasError: boolean
// }

const FilteredEventsPage = (/* props: FilteredEventsPageProps */) => {
  const router = useRouter()
  const [allEvents, setAllEvents] = useState<Event[]>([])

  const filteredData = router.query.slug as string[]

  const { data, error } = useSWR(
    'https://nextjs-course-project-4cea1-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 1000 }
  )

  useEffect(() => {
    if (data) {
      const events = []
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }
      setAllEvents(events)
    }
  }, [data])

  let pageHeadData = (
    <Head key="filtered-events-page-head">
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events." />
    </Head>
  )

  if (!allEvents) {
    return (
      <>
        {pageHeadData}
        <p className={classes.center}>Loading...</p>
      </>
    )
  }

  const filteredYear = +filteredData[0]
  const filteredMonth = +filteredData[1]

  pageHeadData = (
    <Head key="filtered-events-page-head">
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${filteredMonth}/${filteredYear}`}
      />
    </Head>
  )

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className={classes.center}>
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    )
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
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
      {pageHeadData}
      <ResultsTitle date={new Date(filteredYear, filteredMonth - 1)} />
      <EventList events={filteredEvents} />
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { params } = context
//   let filteredData: string[] | undefined
//   let filteredYear: number
//   let filteredMonth: number

//   if (!params) {
//     return {
//       props: {
//         hasError: true,
//       },
//     }
//   } else {
//     filteredData = params.slug as string[]
//     filteredYear = +filteredData[0]
//     filteredMonth = +filteredData[1]
//   }

//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredYear > 2030 ||
//     filteredYear < 2021 ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   })

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: filteredYear,
//         month: filteredMonth,
//       },
//     },
//   }
// }

export default FilteredEventsPage
