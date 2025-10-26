const { rateLimit } = require("express-rate-limit");
const { RATE_LIMIT_WINDOW_ATTEMPTS, RATE_LIMIT_WINDOW_MS } = require("../utils/constants");

const rateLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_WINDOW_MS) : RATE_LIMIT_WINDOW_MS, // Tiempo de ventana en ms
  max: process.env.RATE_LIMIT_WINDOW_ATTEMPTS ? parseInt(process.env.RATE_LIMIT_WINDOW_ATTEMPTS) : RATE_LIMIT_WINDOW_ATTEMPTS, // Límite de intentos por ventana
});

module.exports = rateLimiter;
