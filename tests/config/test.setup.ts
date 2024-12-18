import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import redis from './redis';

const createDbConnection = async () => {
  const mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: 'test',
    },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  afterAll(async () => {
    redis.flushall();
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
  });
};

export { createDbConnection };
