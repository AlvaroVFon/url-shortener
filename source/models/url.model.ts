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

urlSchema.post('save', (url: Url & Document) => {
  redis.set(url.url, url.shortUrl, 'EX', TTL);
});

export default model<Url & Document>('Url', urlSchema);
