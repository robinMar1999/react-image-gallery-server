import winston from "winston";
import chalk from "chalk";

const levelColors = {
  debug: 'whiteBright',
  info: 'cyanBright',
  warn: 'yellowBright',
  error: 'redBright',
};

const messageColors = {
  debug: 'white',
  info: 'cyan',
  warn: 'yellow',
  error: 'red',
};

const consoleLogFormat = winston.format.printf(({ level, message, metadata }) => {
  const coloredLevel = chalk[levelColors[level]](level.toUpperCase());
  const coloredMessage = chalk[messageColors[level]](message);

  return `${coloredLevel}: ${coloredMessage}`;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.metadata({
          fillExcept: ['level', 'message', 'timestamp']
        }),
        winston.format.timestamp(),
        consoleLogFormat
      ),
      level: 'debug'
    }),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
})

export default logger;