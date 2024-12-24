import { Request, Response } from 'express';
import { urlController } from '../../../source/controllers/url.controller';
import { urlService } from '../../../source/services/url.service';
import responseHelper from '../../../source/handlers/responseHandler';
import {
  HttpMessages,
  HttpStatusCodes,
} from '../../../source/utils/responsesEnum';

jest.mock('../../../source/services/url.service');
jest.mock('../../../source/handlers/responseHandler');

describe('UrlController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      redirect: jest.fn(),
    };
  });

  describe('createUrl', () => {
    it('should create a new URL and return it', async () => {
      const url = 'https://example.com';
      const newUrl = { url, shortUrl: 'short123' };
      req.body = { url };
      (urlService.createUrl as jest.Mock).mockResolvedValue(newUrl);

      await urlController.createUrl(req as Request, res as Response);

      expect(urlService.createUrl).toHaveBeenCalledWith(url);
      expect(responseHelper).toHaveBeenCalledWith({
        res,
        status: HttpStatusCodes.CREATED,
        message: HttpMessages.CREATED,
        data: newUrl,
      });
    });
  });

  describe('getUrlFromShortUrl', () => {
    it('should return the original URL and redirect if short URL exists', async () => {
      const shortUrl = 'short123';
      const originalUrl = 'https://example.com';
      req.params = { url: shortUrl };
      (urlService.getUrlFromShortUrl as jest.Mock).mockResolvedValue(
        originalUrl,
      );

      await urlController.getUrlFromShortUrl(req as Request, res as Response);

      expect(urlService.getUrlFromShortUrl).toHaveBeenCalledWith(shortUrl);
      expect(res.redirect).toHaveBeenCalledWith(originalUrl);
    });

    it('should return 404 if short URL does not exist', async () => {
      const shortUrl = 'nonexistent123';
      req.params = { url: shortUrl };
      (urlService.getUrlFromShortUrl as jest.Mock).mockResolvedValue(null);

      await urlController.getUrlFromShortUrl(req as Request, res as Response);

      expect(urlService.getUrlFromShortUrl).toHaveBeenCalledWith(shortUrl);
      expect(responseHelper).toHaveBeenCalledWith({
        res,
        status: HttpStatusCodes.NOT_FOUND,
        message: HttpMessages.NOT_FOUND,
      });
    });

    it('should return 500 if there is an error', async () => {
      const shortUrl = 'short123';
      const error = new Error('Internal Server Error');
      req.params = { url: shortUrl };
      (urlService.getUrlFromShortUrl as jest.Mock).mockRejectedValue(error);

      await urlController.getUrlFromShortUrl(req as Request, res as Response);

      expect(urlService.getUrlFromShortUrl).toHaveBeenCalledWith(shortUrl);
      expect(responseHelper).toHaveBeenCalledWith({
        res,
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: HttpMessages.INTERNAL_SERVER_ERROR,
        error,
      });
    });
  });
});
