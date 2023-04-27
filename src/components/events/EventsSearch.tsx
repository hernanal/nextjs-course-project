import { useRef } from 'react'
import classes from './events-search.module.css'

interface EventsSearchProps {
  onSearch: (year: string, month: string) => void
}

const EventsSearch: React.FC<EventsSearchProps> = ({ onSearch }) => {
  const yearInputRef = useRef<HTMLSelectElement>(null)
  const monthInputRef = useRef<HTMLSelectElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const selectedYear = yearInputRef.current!.value
    const selectedMonth = monthInputRef.current!.value

    onSearch(selectedYear, selectedMonth)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
        </div>

        <button>Find Events</button>
      </div>
    </form>
  )
}

export default EventsSearch
