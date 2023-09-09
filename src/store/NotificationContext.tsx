import { createContext } from 'react'

interface Notification {
  title: string
  message: string
  status: string
}
interface NotificationContext {
  notification: Notification | null
  showNotification: (notification: Notification) => void
  hideNotification: () => void
}

const context: NotificationContext = {
  notification: null,
  showNotification: (notification: Notification) => {},
  hideNotification: () => {},
}

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const showNotificationHandler = (notification: Notification) => {
    context.notification = notification
  }

  const hideNotificationHandler = () => {
    context.notification = null
  }

  const context: NotificationContext = {
    notification: null,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  )
}

const NotificationContext = createContext(context)

export default NotificationContext
