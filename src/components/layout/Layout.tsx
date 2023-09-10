import { useNotification } from '@/context/notification'
import MainHeader from './MainHeader'
import Notification from '../ui/Notification'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { activeNotification } = useNotification()
  const { title, message, status } = activeNotification
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification title={title} message={message} status={status} />
      )}
    </>
  )
}

export default Layout
