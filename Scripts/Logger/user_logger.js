const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "Logs/users/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "Logs/users/info.log",
      level: "info",
    }),
    new winston.transports.File({ filename: "Logs/users/combined.log" }),
  ],
});

module.exports = logger;
