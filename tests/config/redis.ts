import Redis from 'ioredis-mock';
process.loadEnvFile('.env.test');

const PORT = Number(process.env.REDIS_PORT) || 6279;
const HOST = process.env.REDIS_HOST ?? 'localhost';

export default new Redis(`http://${HOST}:${PORT}`);