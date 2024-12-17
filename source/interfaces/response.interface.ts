import { Request, Response } from 'express';
import { HttpStatusCodes } from '../utils/responsesEnum';

export interface HttpResponse {
  req?: Request;
  res: Response;
  status: HttpStatusCodes;
  message: string;
  data?: any;
  error?: any;
}
