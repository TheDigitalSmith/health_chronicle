const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, prettyPrint, json } = format;

const logger = createLogger({
  format: combine(timestamp(), prettyPrint(), json()),
  transports: [
    new transports.Console({
      level: "info",
    }),
    new transports.File({
      level: "error",
      filename: "error.log",
    }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({
      filename: "unhandledRejections.log",
    }),
  ],
});

process.on("unhandledRejection", (err) => {
  throw err;
});

module.exports = logger;
