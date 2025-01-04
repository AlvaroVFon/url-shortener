import { urlService } from '../services/url.service';
import { statsService } from '../services/stats.service';
import { Url } from '../interfaces/url.interface';
import { Request, Response } from 'express';
import responseHelper from '../handlers/responseHandler';
import { HttpMessages, HttpStatusCodes } from '../utils/responsesEnum';

class UrlController {
  async createUrl(req: Request, res: Response): Promise<Response> {
    const { url }: Url = req.body;

    const newUrl = await urlService.createUrl(url);

    return responseHelper({
      res,
      status: HttpStatusCodes.CREATED,
      message: HttpMessages.CREATED,
      data: newUrl,
    });
  }

  async getUrlFromShortUrl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const { url } = req.params;

    try {
      const data = await urlService.getUrlFromShortUrl(url);

      if (!data) {
        return responseHelper({
          res,
          status: HttpStatusCodes.NOT_FOUND,
          message: HttpMessages.NOT_FOUND,
        });
      }
      return res.redirect(data);
    } catch (error) {
      return responseHelper({
        res,
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: HttpMessages.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async getUrlClicks(req: Request, res: Response): Promise<Response> {
    const { shortUrl } = req.params;

    const clicks = await statsService.getUrlClicks(shortUrl);

    if (clicks === null) {
      return responseHelper({
        res,
        status: HttpStatusCodes.NOT_FOUND,
        message: HttpMessages.NOT_FOUND,
      });
    }

    return responseHelper({
      res,
      status: HttpStatusCodes.OK,
      message: HttpMessages.SUCCESS,
      data: clicks,
    });
  }
}

export const urlController = new UrlController();
