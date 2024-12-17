import Url from '../models/url.model';
import { Url as UrlInterface } from '../interfaces/url.interface';
import { nanoid } from 'nanoid';
import redis from '../config/redis';

class UrlService {
  async createUrl(url: string): Promise<UrlInterface> {
    const shortUrl = nanoid();
    const newUrl = new Url({ url, shortUrl });
    return await newUrl.save();
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