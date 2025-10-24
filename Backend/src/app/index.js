require("dotenv").config();
require("../config/instrument");
const express = require("express");
const Sentry = require("@sentry/node");
const setupMiddlewares = require("../middlewares");
const setupRoutes = require("../routes");
const errorHandler = require("../2_middlewares/errorHandler.middleware");

/**
 * Create App - Factory para crear la aplicación Express
 * @returns app Express
 */
const createApp = () => {
  const app = express();

  // Setup de middlewares generales
  setupMiddlewares(app);

  // Setup de Rutas
  setupRoutes(app);

  // Sentry Error Handler
  Sentry.setupExpressErrorHandler(app);

  // Error Handler personalizado
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
