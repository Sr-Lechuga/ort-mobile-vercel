const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");
const { getPing } = require("../3_controllers/public.controller");

const publicRouter = express.Router();

publicRouter.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

publicRouter.get("/ping", getPing);

module.exports = publicRouter;
