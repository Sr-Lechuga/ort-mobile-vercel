const express = require("express");
const {
  getActivities,
  postActivity,
  postActivityInstance,
} = require("../3_controllers/activity.controller");
const {
  activityPostRequestSchema,
} = require("../2_middlewares/request_schemas/acitivityRequest.schema");
const payloadValidator = require("../2_middlewares/payloadValidator.middleware");
const verifySesion = require("../2_middlewares/verifySesion.middleware");
const { activityInstancePostRequestSchema } = require("../2_middlewares/request_schemas/activityInstanceRequest.schema");

const activityRoute = express.Router();

// Public
activityRoute.get("/", getActivities);

// Private
activityRoute.use(verifySesion)
activityRoute.post("/", payloadValidator(activityPostRequestSchema), postActivity);
activityRoute.post("/:id/instancias", payloadValidator(activityInstancePostRequestSchema), postActivityInstance)
// Volunteer Inscription
activityRoute.post("/:activityId/instancias/:instanceId/inscriptions", payloadValidator(activityInstancePostRequestSchema), postActivityInstance)

module.exports = activityRoute;
