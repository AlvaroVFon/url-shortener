import { Response, Request, NextFunction } from 'express';
import { generateLogger } from '../helpers/logger';
import { headerBlackList } from '../utils/headersBlacklist';
import { requestBlackList } from '../utils/requestBlacklist';
import { sanitizeObject } from '../helpers/sanitizeObject';

async function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = generateLogger();
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    const logMessage = {
      status: res.statusCode,
      request: {
        headers: sanitizeObject(req.headers, headerBlackList),
        method: req.method,
        url: req.url,
      },
      responseTime: `${duration}ms`,
    };

    res.statusCode <= 400 && res.statusCode !== 500
      ? logger.info(logMessage)
      : logger.warn({
          ...logMessage,
          body: sanitizeObject(req.body, requestBlackList),
        });

    res.statusCode >= 500 &&
      logger.error({
        ...logMessage,
        body: sanitizeObject(req.body, requestBlackList),
      });
  });

  next();
}

export { loggerMiddleware };
