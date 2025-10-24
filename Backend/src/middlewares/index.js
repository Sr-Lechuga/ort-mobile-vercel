const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimiter = require("../config/rateLimiter");
const errorHandler = require("../2_middlewares/errorHandler.middleware");

const setupMiddlewares = (app) => {
  // Middlewares de configuración
  app.use(rateLimiter);
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  // Error Handler (se configura al final en createApp)
  // app.use(errorHandler);
};

module.exports = setupMiddlewares;
