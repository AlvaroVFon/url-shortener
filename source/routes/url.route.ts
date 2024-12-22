import { Router } from 'express';
import { urlController } from '../controllers/url.controller';

const router = Router();

router
  .post('/', urlController.createUrl)
  .get('/:url', urlController.getUrlFromShortUrl);

export { router as urlRouter };
