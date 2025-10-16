const { rateLimit } = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: process.env.RATE_LIMIT_WINDOW_ATTEMPTS, // Limit each IP to 30 requests per `windowMs` ~1 minute
});

module.exports = rateLimiter;
