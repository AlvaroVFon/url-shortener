import { Request, Response } from 'express';
import { HttpStatusCodes, HttpMessages } from '../utils/responsesEnum';

export interface HttpResponse {
  req?: Request;
  res: Response;
  status: HttpStatusCodes;
  message: HttpMessages | string;
  data?: any;
  error?: any;
}
