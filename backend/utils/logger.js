import winston from 'winston';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import config from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    if (stack) {
      return `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`;
    }
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

const logger = winston.createLogger({
  level: config.logging?.level || 'info',
  format: logFormat,
  transports: [
    // Console output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    // File output
    new winston.transports.File({
      filename: join(__dirname, '..', 'logs', 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: join(__dirname, '..', 'logs', 'combined.log')
    })
  ]
});

// Create a stream object with a 'write' function for Morgan
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

export default logger;