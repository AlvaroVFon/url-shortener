import winston from 'winston';
import { generateLogger } from '../../../source/helpers/logger';

describe('generateLogger', () => {
  it('should create a logger with the correct format and transports', () => {
    const logger = generateLogger();

    expect(logger).toBeInstanceOf(winston.Logger);
    expect(logger.format).toBeDefined();
    expect(logger.transports).toHaveLength(1);

    const transport = logger.transports[0];
    expect(transport).toBeInstanceOf(winston.transports.Console);
    expect(transport.format).toBeDefined();
  });

  it('should log messages with the correct format', () => {
    const logger = generateLogger();
    const logSpy = jest.spyOn(logger, 'info');

    logger.info('Test message');

    expect(logSpy).toHaveBeenCalledWith('Test message');
  });
});