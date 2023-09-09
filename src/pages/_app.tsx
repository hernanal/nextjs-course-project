import Layout from '@/components/layout/Layout'
import Notification from '@/components/ui/Notification'
import { NotificationContextProvider } from '@/store/NotificationContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head key="app-head">
          <title>Next Events</title>
          <meta name="description" content="NextJS Events." />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        <Notification message="This is a test." status="pending" title="Test" />
      </Layout>
    </NotificationContextProvider>
  )
}
