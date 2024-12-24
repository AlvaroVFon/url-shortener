import responseHelper from '../../../source/handlers/responseHandler';
import { Response } from 'express';

describe('responseHelper', () => {
  let res: Partial<Response>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should send a successful response', async () => {
    const status = 200;
    const message = 'Success';
    const data = { key: 'value' };
    const error = null;

    await responseHelper({
      res: res as Response,
      status,
      message,
      data,
      error,
    });

    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json).toHaveBeenCalledWith({
      status,
      message,
      data,
      error,
    });
  });

  it('should send an error response', async () => {
    const status = 500;
    const message = 'Internal Server Error';
    const data = null;
    const error = 'Something went wrong';

    await responseHelper({
      res: res as Response,
      status,
      message,
      data,
      error,
    });

    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json).toHaveBeenCalledWith({
      status,
      message,
      data,
      error,
    });
  });
});