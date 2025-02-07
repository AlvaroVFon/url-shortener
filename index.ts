import express from 'express';
import mongooseConnection from './source/config/mongoose';
import { urlRouter } from './source/routes/url.route';
import { generateLogger } from './source/helpers/logger';
import { loggerMiddleware } from './source/middlewares/logger.middleware';
process.loadEnvFile();

const PORT = Number(process.env.PORT) ?? 3000;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/test';
const logger = generateLogger();

const app = express();

async function middlewares() {
  app.use(express.json());
  app.use(loggerMiddleware);
}
async function routes() {
  app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  app.use('/url', urlRouter);
}

async function main() {
  await middlewares();
  await routes();
  await mongooseConnection(MONGO_URI);

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

main();

export default app;

