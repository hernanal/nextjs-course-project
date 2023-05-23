import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
    return
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    res.status(422).json({ message: 'Invalid email address' })
    return
  }

  await saveEmail(email)

  res.status(201).json({ message: 'Signed up!' })
}

export default handler
