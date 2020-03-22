import { LoggerService } from '@nestjs/common';
import winston from 'winston';
import { yellow } from 'colors/safe';

export class WinstonLogger implements LoggerService {
  constructor(private readonly logger: winston.Logger) {}

  public log(message: string, context?: string): winston.Logger {
    return this.logger.info(message, { context });
  }

  public error(
    message: string,
    trace?: string,
    context?: string
  ): winston.Logger {
    return this.logger.error(message, { trace, context });
  }

  public warn(message: string, context?: string): winston.Logger {
    return this.logger.warn(message, { context });
  }

  public debug?(message: string, context?: string): winston.Logger {
    return this.logger.debug(message, { context });
  }

  public verbose?(message: string, context?: string): winston.Logger {
    return this.logger.verbose(message, { context });
  }
}

const { combine, timestamp, printf, colorize } = winston.format;

const consoleFormat = printf(({ message, timestamp, context, trace }) => {
  return `${timestamp} ${yellow(`[${context}]`)} ${message} ${
    trace ? `\n${trace}` : ''
  }`;
});
const fileFormat = printf(({ level, message, timestamp, context, trace }) => {
  return `${timestamp} ${level} ${context} ${message} ${
    trace ? `\n${trace}` : ''
  }`;
});

export const Logger = new WinstonLogger(
  winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: combine(timestamp(), colorize({ all: true }), consoleFormat),
      }),
      new winston.transports.File({
        filename: '.log',
        format: combine(timestamp(), fileFormat),
      }),
    ],
  })
);
