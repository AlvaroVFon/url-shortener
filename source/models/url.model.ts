import { Schema, model, Document } from 'mongoose';
import { Url, PublicUrl } from '../interfaces/url.interface';
import redis from '../config/redis';

const TTL = process.env.REDIS_TTL ?? 60 * 60 * 24;

const urlSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    methods: {
      toPublicUrl(url: Url): PublicUrl {
        return {
          url: url.url,
          shortUrl: url.shortUrl,
        };
      },
    },
  },
);

urlSchema.post('save', async (url: Url & Document) => {
  try {
    await redis.set(url.shortUrl, url.url, 'EX', TTL);
  } catch (error) {
    console.error('Error saving to Redis:', error);
  }
});

export default model<Url & Document>('Url', urlSchema);
