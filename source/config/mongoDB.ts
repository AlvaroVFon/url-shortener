import { Db, MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'test';

const client = new MongoClient(MONGO_URI);

async function getDb(): Promise<Db> {
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    return db;
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    throw error;
  }
}

export { getDb };
