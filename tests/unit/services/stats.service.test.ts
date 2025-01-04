import { statsService } from '../../../source/services/stats.service';
import redis from '../../../source/config/redis';
import Url from '../../../source/models/url.model';

jest.mock('../../../source/config/redis', () => ({
  get: jest.fn(),
}));

jest.mock('../../../source/models/url.model', () => ({
  findOne: jest.fn(),
}));

describe('getUrlClicks', () => {
  it('should return the number of clicks from Redis if available', async () => {
    const shortUrl = 'abc123';
    const clicks = '10';

    (redis.get as jest.Mock).mockResolvedValue(clicks);

    const result = await statsService.getUrlClicks(shortUrl);

    expect(result).toBe(10);
    expect(redis.get).toHaveBeenCalledWith(`clicks: ${shortUrl}`);
  });

  it('should return the number of clicks from the database if not available in Redis', async () => {
    const shortUrl = 'abc123';
    const clicksFromDb = { clicks: 5 };

    (redis.get as jest.Mock).mockResolvedValue(null);
    (Url.findOne as jest.Mock).mockResolvedValue(clicksFromDb);

    const result = await statsService.getUrlClicks(shortUrl);

    expect(result).toBe(5);
    expect(redis.get).toHaveBeenCalledWith(`clicks: ${shortUrl}`);
    expect(Url.findOne).toHaveBeenCalledWith({ shortUrl });
  });

  it('should return null if clicks are not available in Redis or the database', async () => {
    const shortUrl = 'abc123';

    (redis.get as jest.Mock).mockResolvedValue(null);
    (Url.findOne as jest.Mock).mockResolvedValue(null);

    const result = await statsService.getUrlClicks(shortUrl);

    expect(result).toBeNull();
    expect(redis.get).toHaveBeenCalledWith(`clicks: ${shortUrl}`);
    expect(Url.findOne).toHaveBeenCalledWith({ shortUrl });
  });
});
