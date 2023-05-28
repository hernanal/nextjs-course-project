import { MongoClient, ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

interface NewComment {
  email: string
  name: string
  text: string
  eventId: string | string[] | undefined
  id?: ObjectId
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId

  const client = await MongoClient.connect(
    'mongodb+srv://hernanal:fRz66rurNMu9LRLo@cluster0.an1k2.mongodb.net/events'
  )

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    // Simple validation
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' })
      return
    }

    const newComment: NewComment = {
      email,
      name,
      text,
      eventId,
    }

    const db = client.db()
    const result = await db.collection('comments').insertOne(newComment)

    console.log(result)

    newComment.id = result.insertedId
    res.status(201).json({ message: 'Added comment.', comment: newComment })
  }

  if (req.method === 'GET') {
    const db = client.db()
    const comments = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray()

    res.status(200).json({ comments })
  }

  client.close()
}

export default handler
