import { useRef } from 'react'
import classes from './newsletter-registration.module.css'
import { useNotification } from '@/context/notification'

function NewsletterRegistration() {
  const { showNotification } = useNotification()
  const emailInputRef = useRef<HTMLInputElement>(null)

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current!.value

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    })

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
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then((data) => {
        showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        })
      })
      .catch((error) => {
        showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        })
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
