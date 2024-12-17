import mongoose from 'mongoose';

export default async function mongooseConnection(mongoUri: string) {
  try {
    return await mongoose.connect(mongoUri);
  } catch (error) {
    console.error('MongoDB connection failed');
    console.error(error);
  }
}
