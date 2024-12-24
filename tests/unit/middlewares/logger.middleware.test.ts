import { Request, Response, NextFunction } from 'express';
import { loggerMiddleware } from '../../../source/middlewares/logger.middleware';
import { generateLogger } from '../../../source/helpers/logger';
import { sanitizeObject } from '../../../source/helpers/sanitizeObject';

jest.mock('../../../source/helpers/logger');
jest.mock('../../../source/helpers/sanitizeObject');

describe('loggerMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let logger: any;

  beforeEach(() => {
    req = {
      headers: { 'x-test-header': 'test' },
      method: 'GET',
      url: '/test-url',
      body: { key: 'value' },
    };
    res = {
      on: jest.fn(),
      statusCode: 200,
    };
    next = jest.fn();
    logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    (generateLogger as jest.Mock).mockReturnValue(logger);
    (sanitizeObject as jest.Mock).mockImplementation((obj) => obj);
  });

  it('should log info for successful requests', () => {
    (res.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === 'finish') {
        callback();
      }
    });

    loggerMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    expect(logger.info).toHaveBeenCalledWith({
      status: 200,
      request: {
        headers: req.headers,
        method: req.method,
        url: req.url,
      },
      responseTime: expect.any(String),
    });
  });

  it('should log warn for client errors', () => {
    res.statusCode = 400;
    (res.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === 'finish') {
        callback();
      }
    });

    loggerMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    expect(logger.warn).toHaveBeenCalledWith({
      status: 400,
      request: {
        headers: req.headers,
        method: req.method,
        url: req.url,
      },
      responseTime: expect.any(String),
      body: req.body,
    });
  });

  it('should log error for server errors', () => {
    res.statusCode = 500;
    (res.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === 'finish') {
        callback();
      }
    });

    loggerMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    expect(logger.error).toHaveBeenCalledWith({
      status: 500,
      request: {
        headers: req.headers,
        method: req.method,
        url: req.url,
      },
      responseTime: expect.any(String),
      body: req.body,
    });
  });
});