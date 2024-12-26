import { Router } from 'express';
import { urlValidator } from '../middlewares/urlValidator.middleware';
import { urlController } from '../controllers/url.controller';

const router = Router();

router
  .post('/', urlValidator, urlController.createUrl)
  .get('/:url', urlController.getUrlFromShortUrl);

export { router as urlRouter };
