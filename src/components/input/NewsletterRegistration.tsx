import { useRef } from 'react'
import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null)

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current!.value

    // optional: validate input
    if (!enteredEmail.includes('@')) {
      return
    }

    // send valid data to API
    const reqBody = { email: enteredEmail }
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
