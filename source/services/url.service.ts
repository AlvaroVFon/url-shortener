import Url from '../models/url.model';
import { Url as UrlInterface } from '../interfaces/url.interface';
import crypto from 'node:crypto';
import redis from '../config/redis';

const TTL = process.env.REDIS_TTL ?? 60 * 60 * 24;
const CACHE = true;

class UrlService {
  async createUrl(url: string): Promise<UrlInterface | string | null> {
    const existingUrl = await Url.findOne({ url });

    if (existingUrl) {
      return existingUrl;
    }

    const shortUrl = crypto.randomUUID();
    const newUrl = await Url.create({ url, shortUrl });
    await newUrl.save();

    if (CACHE) {
      await redis.set(url, shortUrl, 'EX', TTL);
    }

    return newUrl;
  }

  async getUrlFromShortUrl(shortUrl: string): Promise<string | null> {
    const cachedUrl = CACHE ? await redis.get(shortUrl) : null;

    if (cachedUrl) {
      return cachedUrl;
    }

    const url = await Url.findOne({ shortUrl });
    return url ? url.url : null;
  }
}

export const urlService = new UrlService();
