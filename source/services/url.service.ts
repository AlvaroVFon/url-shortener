import Url from '../models/url.model';
import { Url as UrlInterface } from '../interfaces/url.interface';
import crypto from 'node:crypto';
import redis from '../config/redis';

const CACHE = process.env.CACHE ?? true;
const TTL = process.env.TTL ?? 3600;

class UrlService {
  async createUrl(url: string): Promise<UrlInterface | string | null> {
    const existingUrl = await Url.findOne({ url });

    if (existingUrl) {
      redis.set(existingUrl.shortUrl, existingUrl.url, 'EX', TTL);
      redis.incr(`clicks: ${existingUrl.shortUrl}`);
      return existingUrl;
    }

    const shortUrl = crypto.randomUUID();
    const newUrl = await Url.create({ url, shortUrl });
    await newUrl.save();
    return newUrl;
  }

  async getUrlFromShortUrl(shortUrl: string): Promise<string | null> {
    const cachedUrl = CACHE ? await redis.get(shortUrl) : null;

    if (cachedUrl) {
      await redis.incr(`clicks: ${shortUrl}`);
      return cachedUrl;
    }

    const url = await Url.findOne({ shortUrl });
    return url ? url.url : null;
  }
}

export const urlService = new UrlService();
