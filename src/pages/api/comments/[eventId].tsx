import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '@/helpers/dbUtils'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export interface NewComment {
  email: string
  name: string
  text: string
  eventId: string | string[] | undefined
  _id?: ObjectId
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId
  let client

  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' })
    return
  }

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
      client.close()
      return
    }

    const newComment: NewComment = {
      email,
      name,
      text,
      eventId,
    }

    let result
    try {
      result = await insertDocument(client, 'comments', newComment)
      newComment._id = result.insertedId

      res.status(201).json({ message: 'Added comment.', comment: newComment })
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' })
    }
  }

  if (req.method === 'GET') {
    let comments
    try {
      comments = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId }
      )
      res.status(200).json({ comments })
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' })
    }
  }

  client.close()
}

export default handler
