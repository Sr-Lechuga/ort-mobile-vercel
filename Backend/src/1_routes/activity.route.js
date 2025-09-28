const express = require("express")
const verifySesion = require("../2_middlewares/verifySesion.middleware");
const { getActivities, postActivity, postActivityInstance, postInstanceInscription } = require("../3_controllers/activity.controller");
const { activityPostRequestSchema, activityPatchRequestSchema } = require("../2_middlewares/request_schemas/acitivityRequest.schema");
const { activityInstancePostRequestSchema, activityInstancePatchRequestSchema } = require("../2_middlewares/request_schemas/activityInstanceRequest.schema");
const payloadValidator = require("../2_middlewares/payloadValidator.middleware");

const activityRoute = express.Router()

// Public
activityRoute.get("/", getActivities);

// Private
activityRoute.use(verifySesion)
activityRoute.post("/", payloadValidator(activityPostRequestSchema), postActivity)
activityRoute.patch("/", payloadValidator(activityPatchRequestSchema), postActivity)
activityRoute.post("/:activityId/instancias", payloadValidator(activityInstancePostRequestSchema), postActivityInstance)
activityRoute.patch("/:activityId/instancias/instanceId", payloadValidator(activityInstancePatchRequestSchema), postActivityInstance)
// Volunteer Inscription
activityRoute.post("/:activityId/instancias/:instanceId/inscripciones", postInstanceInscription)

module.exports = activityRoute;
