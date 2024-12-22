import { Router } from 'express';
import { urlController } from '../controllers/url.controller';

const router = Router();

router
  .post('/', urlController.createUrl)
  .get('/:url', urlController.getUrlFromShortUrl)
  .get('/shortUrl', urlController.getShortUrlFromUrl);

export { router as urlRouter };
