const express = require("express");
const verifySesion = require("../2_middlewares/verifySesion.middleware");
const {
  getActivities,
  postActivity,
  patchActivity,
  deleteActivity,
  postActivityInstance,
  postInstanceInscription,
  patchActivityInstance,
  patchInscriptionAttendance,
} = require("../3_controllers/activity.controller");
const { activityPostRequestSchema, activityPatchRequestSchema } = require("../2_middlewares/request_schemas/acitivityRequest.schema");
const { activityInstancePostRequestSchema, activityInstancePatchRequestSchema } = require("../2_middlewares/request_schemas/activityInstanceRequest.schema");
const payloadValidator = require("../2_middlewares/payloadValidator.middleware");
const { USER_ORGANIZER, USER_VOLUNTEER } = require("../utils/constants");
const verifyAccessLevel = require("../2_middlewares/verifyAccessLevel.middleware");
const { inscriptionAttendanceSchema } = require("../2_middlewares/request_schemas/inscriptionAttendance.schema");

const activityRoute = express.Router();

// Public
activityRoute.get("/", getActivities);

// Private
activityRoute.use(verifySesion);

//Activities
activityRoute.post("/", payloadValidator(activityPostRequestSchema), verifyAccessLevel([USER_ORGANIZER]), postActivity);
activityRoute.patch("/:activityId", payloadValidator(activityPatchRequestSchema), verifyAccessLevel([USER_ORGANIZER]), patchActivity);
activityRoute.delete("/:activityId", verifyAccessLevel([USER_ORGANIZER]), deleteActivity);

//Instances
activityRoute.post("/:activityId/instances", payloadValidator(activityInstancePostRequestSchema), verifyAccessLevel([USER_ORGANIZER]), postActivityInstance);
activityRoute.patch("/:activityId/instances/instanceId", payloadValidator(activityInstancePatchRequestSchema), verifyAccessLevel([USER_ORGANIZER]), patchActivityInstance);

// Volunteer Inscription
activityRoute.post("/:activityId/instances/:instanceId/inscriptions", verifyAccessLevel([USER_VOLUNTEER]), postInstanceInscription);

// Organizer Inscription Attendance Validation
activityRoute.patch(
  "/:activityId/instances/:instanceId/inscriptions/:inscriptionId/attendance",
  payloadValidator(inscriptionAttendanceSchema),
  verifyAccessLevel([USER_ORGANIZER]),
  patchInscriptionAttendance
);

module.exports = activityRoute;
