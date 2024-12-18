import Url from '../models/url.model';
import { Url as UrlInterface } from '../interfaces/url.interface';
import crypto from 'node:crypto';
import redis from '../config/redis';

const TTL = process.env.REDIS_TTL ?? 60 * 60 * 24;
const CACHE = process.env.CACHE ?? true;

class UrlService {
  async createUrl(url: string): Promise<UrlInterface | string | null> {
    const cachedShortUrl = CACHE ? await this.getShortUrlFromRedis(url) : null;

    console.log('Here');
    console.log('cachedShortUrl', cachedShortUrl);
    if (cachedShortUrl !== null) {
      console.log('Inside cachedShortUrl', cachedShortUrl);
      return cachedShortUrl;
    }

    const existingUrl = await Url.findOne({ url });

    if (existingUrl) {
      console.log('Inside existingUrl');
      return existingUrl;
    }

    const shortUrl = crypto.randomUUID();
    const newUrl = new Url({ url, shortUrl });
    await newUrl.save();

    if (CACHE) {
      await redis.set(url, shortUrl, 'EX', TTL);
    }

    return newUrl;
  }

  async getUrlFromShortUrl(shortUrl: string): Promise<string | null> {
    const url = await Url.findOne({ shortUrl });
    return url ? url.url : null;
  }

  async getShortUrlFromUrl(url: string): Promise<string | null> {
    if (CACHE) {
      const cacheShortUrl = await this.getShortUrlFromRedis(url);
      return cacheShortUrl;
    }
    const existingUrl = await Url.findOne({ url });
    return existingUrl ? existingUrl.shortUrl : null;
  }

  async getShortUrlFromRedis(url: string): Promise<string | null> {
    if (!CACHE) return null;
    return await redis.get(url);
  }
}

export const urlService = new UrlService();
