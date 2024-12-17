import express from 'express';
import mongooseConnection from './source/config/mongoose';
import { urlRouter } from './source/routes/url.route';
process.loadEnvFile();

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/test';

const app = express();

async function middlewares() {
  app.use(express.json());
}
async function routes() {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
  });
  app.use('/url', urlRouter);
}

async function main() {
  await middlewares();
  await routes();
  await mongooseConnection(MONGO_URI);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
