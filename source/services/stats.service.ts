import redis from '../config/redis';
import Url from '../models/url.model';

async function getUrlClicks(shortUrl: string): Promise<Number | null> {
  const clicks = await redis.get(`clicks: ${shortUrl}`);

  if (clicks) {
    return parseInt(clicks);
  }

  const clicksFromDb = await Url.findOne({ shortUrl });

  return clicksFromDb?.clicks ?? null;
}

export const statsService = {
  getUrlClicks,
};
