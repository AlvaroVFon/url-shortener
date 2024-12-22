import Joi from 'joi';
import { Url } from '../interfaces/url.interface';

//TODO: esto no tiene sentido, no se deberia validar el shortUrl
const urlSchema = Joi.object<Url>({
  url: Joi.string().uri().required(),
  shortUrl: Joi.string().uuid().length(20),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

export default urlSchema;
