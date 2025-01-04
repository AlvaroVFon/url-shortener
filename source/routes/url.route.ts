import { Router } from 'express';
import { urlValidator } from '../middlewares/urlValidator.middleware';
import { urlController } from '../controllers/url.controller';

const router = Router();

router
  .post('/', urlValidator, urlController.createUrl)
  .get('/:url', urlController.getUrlFromShortUrl)
  .get('/stats/:shortUrl', urlController.getUrlClicks);
export { router as urlRouter };
