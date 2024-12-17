import Joi from 'joi';
import { Url } from '../interfaces/url.interface';

const urlSchema = Joi.object<Url>({
  url: Joi.string().uri().required(),
  shortUrl: Joi.string().required().base64().length(20),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date(),
});

export default urlSchema;
