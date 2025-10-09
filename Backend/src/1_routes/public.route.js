const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");
const { getPing } = require("../3_controllers/public.controller");

const publicRouter = express.Router();

// Configuración de Swagger UI para Vercel usando CDN
const swaggerOptions = {
  customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.0.0/swagger-ui.css",
  customJs: ["https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.0.0/swagger-ui-bundle.js", "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.0.0/swagger-ui-standalone-preset.js"],
  swaggerOptions: {
    persistAuthorization: true,
  },
};

publicRouter.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

publicRouter.get("/ping", getPing);

publicRouter.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

module.exports = publicRouter;
