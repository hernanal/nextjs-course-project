import { Event } from '@/types/eventTypes'

export const getAllEvents = async (): Promise<Event[]> => {
  const res = await fetch(
    'https://nextjs-course-project-4cea1-default-rtdb.firebaseio.com/events.json'
  )
  const data = await res.json()
  const events = []
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    })
  }
  return events
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()

  return allEvents.filter((event) => event.isFeatured)
}

export async function getEventById(id: string | string[] | undefined) {
  const allEvents = await getAllEvents()
  return allEvents.find((event) => event.id === id)
}

export async function getFilteredEvents(dateFilter: any) {
  const { year, month } = dateFilter

  const allEvents = await getAllEvents()

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}
