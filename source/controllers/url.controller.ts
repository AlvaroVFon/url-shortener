import { urlService } from '../services/url.service';
import { Url, PublicUrl } from '../interfaces/url.interface';
import { Request, Response } from 'express';
import BadRequestException from '../exceptions/BadRequestException';
import responseHelper from '../handlers/responseHandler';
import { HttpMessages, HttpStatusCodes } from '../utils/responsesEnum';
import { HttpResponse } from '../interfaces/response.interface';
import { Http } from 'winston/lib/winston/transports';
import NotFountException from '../exceptions/NotFoundException';

//TODO: Revisar el controller, añádir comprobaciones, crear helpers para las responses

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

  async getUrlFromShortUrl(req: Request, res: Response): Promise<Response> {
    const { shortUrl } = req.params;
    const url = await urlService.getUrlFromShortUrl(shortUrl);
    if (!url) {
      throw new NotFountException();
    }
    return responseHelper({ res, status: HttpStatusCodes.OK, message: HttpMessages.SUCCESS, data: url })
  }

  //TODO: Revisar return
  async getShortUrlFromUrl(req: Request, res: Response): Promise<void> {
    const { url } = req.body;
    const shortUrl = await urlService.getShortUrlFromUrl(url);
    if (!shortUrl) {
      throw new NotFountException('Url not found')
    }
    res.json({ shortUrl });
  }
}

export const urlController = new UrlController();