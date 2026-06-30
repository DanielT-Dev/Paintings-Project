const expressWinston = require("express-winston");
const logger = require("../utils/logger");

module.exports = expressWinston.logger({
  winstonInstance: logger,

  level: "info",

  msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",

  meta: false,

  colorize: true,

  ignoreRoute(req) {
    return req.url.startsWith("/paintings");
  },
});