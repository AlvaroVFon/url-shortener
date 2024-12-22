import winston from 'winston';

function generateLogger() {
  return winston.createLogger({
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
}

export { generateLogger };
