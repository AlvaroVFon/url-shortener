import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
process.loadEnvFile('.env.test');
//mocks

const DB_NAME = process.env.DB_NAME ?? 'test';

jest.setTimeout(30000);

jest.mock('ioredis', () => {
  return require('ioredis-mock');
});

beforeAll(async () => {
  await dbConnection();
});

afterAll(async () => {
  await mongoose.connection.close();
});

const dbConnection = async (): Promise<mongoose.Mongoose> => {
  const mongod = await MongoMemoryServer.create({
    instance: {
      dbName: DB_NAME,
    },
  });
  const uri = mongod.getUri();
  return await mongoose.connect(uri);
};

const getDatabase = async (): Promise<mongoose.Connection> => {
  return mongoose.connection;
};

export { dbConnection, getDatabase };
