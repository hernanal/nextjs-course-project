import { MongoClient, Document } from 'mongodb'

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://hernanal:fRz66rurNMu9LRLo@cluster0.an1k2.mongodb.net/events'
  )

  return client
}

export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: Document
) => {
  const db = client.db()
  const result = await db.collection(collection).insertOne(document)
  return result
}

export const getAllDocuments = async (
  client: MongoClient,
  collection: string,
  sort: any,
  filter = {}
) => {
  const db = client.db()
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray()
  return documents
}
