import Joi from 'joi';
import { Url } from '../interfaces/url.interface';

const urlSchema = Joi.object<Url>({
  url: Joi.string().uri().required(),
});

export default urlSchema;
