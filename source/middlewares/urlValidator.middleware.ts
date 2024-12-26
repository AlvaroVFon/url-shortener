import { Response, Request, NextFunction } from 'express';
import responseHelper from '../handlers/responseHandler';
import { urlSchema } from '../validators/url.validator';
import { HttpStatusCodes } from '../utils/responsesEnum';

async function urlValidator(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const body = req.body;
  const { error } = urlSchema.validate(body);

  if (error) {
    return responseHelper({
      res,
      status: HttpStatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
  next();
}

export { urlValidator };
