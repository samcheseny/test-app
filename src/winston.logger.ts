import { format, transports } from 'winston';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';

const options = {
  file: {
    filename: 'error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
  },
};

export function getLoggerOptions(
  environment: string,
  logLevel: string,
): WinstonModuleOptions {
  if (environment == 'development' || environment == 'production') {
    return {
      level: logLevel,
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json(),
      ),
      transports: [new transports.Console()],
    };
  }

  return {
    level: logLevel,
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json(),
    ),
    transports: [
      new transports.File(options.file),
      new transports.File({
        filename: 'combine.log',
        level: 'info',
      }),
    ],
  };
}
