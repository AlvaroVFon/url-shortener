import { Request, Response, NextFunction } from 'express';
import { urlValidator } from '../../../source/middlewares/urlValidator.middleware';
import responseHelper from '../../../source/handlers/responseHandler';
import { urlSchema } from '../../../source/validators/url.validator';
import { HttpStatusCodes } from '../../../source/utils/responsesEnum';

jest.mock('../../../source/handlers/responseHandler');

describe('urlValidator Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('should call next if validation passes', async () => {
    req = { body: { url: 'http://example.com' } };

    urlSchema.validate = jest.fn().mockReturnValue({ value: req.body });

    await urlValidator(req as Request, res as Response, next as NextFunction);

    expect(urlSchema.validate).toHaveBeenCalledWith(req.body);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if validation fails', async () => {
    const req = { body: { url: 1234 } };

    urlSchema.validate = jest.fn().mockReturnValue({ error: 'Invalid URL' });
    await urlValidator(req as Request, res as Response, next as NextFunction);

    expect(urlSchema.validate).toHaveBeenCalledWith(req.body);
    expect(responseHelper).toHaveBeenCalledWith({
      res,
      status: HttpStatusCodes.BAD_REQUEST,
    });
    expect(next).not.toHaveBeenCalled();
  });
});
