import winston from 'winston';

function createLogger() {
  const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.json(),
          winston.format.timestamp(),
        ),
      }),
    ],
  });

  return logger;
}

export { createLogger };
