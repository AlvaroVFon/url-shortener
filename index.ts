import express from 'express';
process.loadEnvFile();

const PORT = Number(process.env.PORT) || 3000;

const app = express();

async function middlewares() {}
async function routes() {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
  });
}

async function main() {
  await middlewares();
  await routes();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
