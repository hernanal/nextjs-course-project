import { MongoClient, Document } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://hernanal:fRz66rurNMu9LRLo@cluster0.an1k2.mongodb.net/events'
  )

  return client
}

const insertDocument = async (client: MongoClient, document: Document) => {
  const db = client.db()
  const result = await db.collection('newsletter').insertOne(document)
  return result
}

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

  let client

  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' })
    return
  }

  try {
    await insertDocument(client, email)
    client.close()
  } catch (error) {
    res.status(500).json({ message: 'Inserting data failed!' })
    return
  }

  // await saveEmail(email)

  res.status(201).json({ message: 'Signed up!' })
}

export default handler
