const express = require("express");
const verifySesion = require("../2_middlewares/verifySesion.middleware");
const { getActivities, postActivity, postActivityInstance, postInstanceInscription, patchActivityInstance } = require("../3_controllers/activity.controller");
const { activityPostRequestSchema, activityPatchRequestSchema } = require("../2_middlewares/request_schemas/acitivityRequest.schema");
const { activityInstancePostRequestSchema, activityInstancePatchRequestSchema } = require("../2_middlewares/request_schemas/activityInstanceRequest.schema");
const payloadValidator = require("../2_middlewares/payloadValidator.middleware");
const { USER_ORGANIZER, USER_VOLUNTEER } = require("../utils/constants");
const verifyAccessLevel = require("../2_middlewares/verifyAccessLevel.middleware");

const activityRoute = express.Router();

// Public
activityRoute.get("/", getActivities);

// Private
activityRoute.use(verifySesion);
//Activities
activityRoute.post("/", payloadValidator(activityPostRequestSchema), verifyAccessLevel([USER_ORGANIZER]), postActivity);
activityRoute.patch("/", payloadValidator(activityPatchRequestSchema), verifyAccessLevel([USER_ORGANIZER]), postActivity);
//Instances
activityRoute.post(
  "/:activityId/instancias",
  payloadValidator(activityInstancePostRequestSchema),
  verifyAccessLevel([USER_ORGANIZER]),
  postActivityInstance
);
activityRoute.patch(
  "/:activityId/instancias/instanceId",
  payloadValidator(activityInstancePatchRequestSchema),
  verifyAccessLevel([USER_ORGANIZER]),
  patchActivityInstance
);

// Volunteer Inscription
activityRoute.post("/:activityId/instancias/:instanceId/inscripciones", verifyAccessLevel([USER_VOLUNTEER]), postInstanceInscription);

module.exports = activityRoute;
