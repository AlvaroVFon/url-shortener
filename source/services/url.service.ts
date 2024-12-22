import Url from '../models/url.model';
import { Url as UrlInterface } from '../interfaces/url.interface';
import crypto from 'node:crypto';
import redis from '../config/redis';

const TTL = process.env.REDIS_TTL ?? 60 * 60 * 24;
const CACHE = true;

class UrlService {
  async createUrl(url: string): Promise<UrlInterface | string | null> {
    const cachedShortUrl = CACHE ? await this.getShortUrlFromRedis(url) : null;

    if (cachedShortUrl !== null) {
      return cachedShortUrl;
    }

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
    const url = await Url.findOne({ shortUrl });
    return url ? url.url : null;
  }

  async getShortUrlFromUrl(url: string): Promise<string | null> {
    if (CACHE) {
      const cacheShortUrl = await this.getShortUrlFromRedis(url);
      return cacheShortUrl;
    }
    const existingUrl = await Url.findOne({ shortUrl: url });
    return existingUrl ? existingUrl.shortUrl : null;
  }

  async getShortUrlFromRedis(url: string): Promise<string | null> {
    if (!CACHE) return null;
    return await redis.get(url);
  }
}

export const urlService = new UrlService();
