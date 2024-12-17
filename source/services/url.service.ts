import Url from '../models/url.model';
import { Url as UrlInterface } from '../interfaces/url.interface';
import crypto from 'node:crypto';
import redis from '../config/redis';

const TTL = process.env.REDIS_TTL ?? 60 * 60 * 24;
class UrlService {
  async createUrl(url: string): Promise<UrlInterface | string | null> {
    const shortUrl = crypto.randomUUID();

    //TODO: check if this works with redis offline
    const alreadyExist = (await Url.findOne({ url })) ?? (await redis.get(url));

    //TODO: see how to update ttl if already exist in redis
    if (alreadyExist) {
      return alreadyExist;
    }

    const newUrl = new Url({ url, shortUrl });
    await newUrl.save();
    await redis.set(url, shortUrl, 'EX', TTL);

    return newUrl;
  }

  async getUrlFromShortUrl(shortUrl: string): Promise<string | null> {
    const url = await Url.findOne({ shortUrl });
    return url ? url.url : null;
  }

  async getShortUrlFromUrl(
    url: string,
    cache: boolean = true,
  ): Promise<string | null> {
    if (cache) {
      const cacheShortUrl = await this.getShortUrlFromRedis(url);
      return cacheShortUrl;
    }
    const existingUrl = await Url.findOne({ url });
    return existingUrl ? existingUrl.shortUrl : null;
  }

  async getShortUrlFromRedis(
    url: string,
    cache: boolean = true,
  ): Promise<string | null> {
    if (!cache) return null;

    const cacheShortUrl = await redis.get(url);
    return cacheShortUrl;
  }
}

export const urlService = new UrlService();

//TODO: Check all this methods in the controller
