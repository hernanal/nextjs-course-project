import { useContext } from 'react'
import { createContext, useState } from 'react'

interface Notification {
  title: string
  message: string
  status: string
}
interface NotificationContextProps {
  activeNotification: Notification
  showNotification: (notification: Notification) => void
  hideNotification: () => void
}

interface NotificationProviderProps {
  children: React.ReactNode
}

const NotificationContext = createContext<NotificationContextProps>(null)

export const NotificationContextProvider = ({
  children,
}: NotificationProviderProps) => {
  const [activeNotification, setActiveNotification] =
    useState<Notification>(null)

  const showNotification = (notification: Notification) => {
    setActiveNotification(notification)
  }

  const hideNotification = () => {
    setActiveNotification(null)
  }

  return (
    <NotificationContext.Provider
      value={{
        activeNotification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = (): NotificationContextProps =>
  useContext(NotificationContext)
