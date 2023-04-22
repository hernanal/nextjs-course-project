import { useRouter } from 'next/router'

const ClientProjectPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Client Profile Page</h1>
      <p>{id}</p>
    </div>
  )
}

export default ClientProjectPage
