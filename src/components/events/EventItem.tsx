import { Event } from '@/types/eventTypes'
import classes from './event-item.module.css'
import Button from '../ui/Button'
import DateIcon from '../icons/DateIcon'
import AddressIcon from '../icons/AddressIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import Image from 'next/image'

interface EventProps {
  event: Event
}

const EventItem = ({ event }: EventProps) => {
  const { title, image, date, location, id } = event
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedAddress = location.replace(', ', '\n')
  const exploreLink = `/events/${id}`
  return (
    <li className={classes.item}>
      <Image src={'/' + image} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem
