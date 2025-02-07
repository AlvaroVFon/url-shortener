import { describe, it, expect } from '@jest/globals';
import { urlService } from '../../../source/services/url.service';
import { getDatabase } from '../../config/jest.setup';
import Url from '../../../source/models/url.model';
import mongoose from 'mongoose';

describe('services/url.service', () => {
  let db: mongoose.Connection;
  beforeAll(async () => {
    db = await getDatabase();
  });

  afterEach(async () => {
    await db.dropDatabase();
  });

  it('getUrlFromShortUrl() -> Should return the original URL from short URL', async () => {
    const url = 'https://example.com';
    const shortUrl = 'short123';

    await Url.create({ url, shortUrl });
    const result = await urlService.getUrlFromShortUrl(shortUrl);

    expect(result).toBe(url);
  });

  it('getUrlFromShortUrl() -> Should return null if short URL does not exist', async () => {
    const shortUrl = 'nonexistent123';

    const result = await urlService.getUrlFromShortUrl(shortUrl);

    expect(result).toBeNull();
  });

  it('createUrl() -> Should return existing URL if it already exists', async () => {
    const url = 'https://example.com';
    const shortUrl = 'short123';
    await db.collection('urls').insertOne({ url, shortUrl });

    const result = await urlService.createUrl(url);

    expect(result).toHaveProperty('url', url);
    expect(result).toHaveProperty('shortUrl', shortUrl);
  });

  it('getUrlFromShortUrl() -> Should return cached URL if exists in Redis', async () => {
    const url = 'https://example.com';
    const shortUrl = 'short123';

    const result = await urlService.getUrlFromShortUrl(shortUrl);

    expect(result).toBe(url);
  });
});
