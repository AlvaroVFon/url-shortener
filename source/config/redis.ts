import Redis from 'ioredis'
process.loadEnvFile()

const PORT = Number(process.env.REDIS_PORT) || 6379
const HOST = process.env.REDIS_HOST ?? 'localhost'

const redis = new Redis(PORT, HOST)

export default redis

