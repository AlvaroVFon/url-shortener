import { urlService } from '../services/url.service';
import { Url, PublicUrl } from '../interfaces/url.interface';
import { Request, Response } from 'express';

//TODO: Revisar el controller, añádir comprobaciones, crear helpers para las responses

class UrlController {
  async createUrl(req: Request, res: Response): Promise<void> {
    const { url } = req.body;
    const newUrl = await urlService.createUrl(url);
    res.json(newUrl);
  }

  async getUrlFromShortUrl(req: Request, res: Response): Promise<void> {
    const { shortUrl } = req.params;
    const url = await urlService.getUrlFromShortUrl(shortUrl);
    if (!url) {
      res.status(404).json({ message: 'URL not found' });
      return;
    }
    res.redirect(url);
  }

  async getShortUrlFromUrl(req: Request, res: Response): Promise<void> {
    const { url } = req.body;
    const shortUrl = await urlService.getShortUrlFromUrl(url);
    if (!shortUrl) {
      res.status(404).json({ message: 'Short URL not found' });
      return;
    }
    res.json({ shortUrl });
  }
}
