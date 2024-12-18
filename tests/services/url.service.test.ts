import { describe, it, expect } from '@jest/globals';
import { urlService } from '../../source/services/url.service';
import redis from '../config/redis';
import { before } from 'node:test';

describe('services/url.service', () => {
  beforeAll(async () => {
    await redis.flushall();
  });

  it('createUrl() -> Should return a new Url', async () => {
    console.log(await redis.get('https://example.com'));
    const url = 'https://example.com';
    const newUrl = await urlService.createUrl(url);
    console.log(newUrl);
    expect(newUrl).toHaveProperty('url', url);
    expect(newUrl).toHaveProperty('shortUrl');
  });
});
