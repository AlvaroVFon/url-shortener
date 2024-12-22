import { describe, it, expect } from '@jest/globals';
import { urlService } from '../../../source/services/url.service';
import { getDatabase } from '../../config/jest.setup';
import mongoose from 'mongoose';
import { string } from 'joi';

describe('services/url.service', () => {
  let db: mongoose.Connection;
  beforeAll(async () => {
    db = await getDatabase();
  });

  afterEach(async () => {
    await db.dropDatabase();
  });

  it('createUrl() -> Should return a new Url', async () => {
    const url = 'https://example.com';
    const newUrl = await urlService.createUrl(url);
    const dataBaseUrl = await db.collection('urls').findOne({ url });

    expect(newUrl).toHaveProperty('url', url);
    expect(newUrl).toHaveProperty('shortUrl');
    expect(dataBaseUrl).toBeDefined();
    expect(dataBaseUrl).toHaveProperty('_id');
  });
});
