const express = require("express");
const {
  getActivities,
  postActivity,
} = require("../3_controllers/activity.controller");
const {
  activityPostRequestSchema,
} = require("../2_middlewares/request_schemas/acitivityRequest.schema");
const payloadValidator = require("../2_middlewares/payloadValidator.middleware");

const activityRoute = express.Router();

activityRoute.post(
  "/",
  payloadValidator(activityPostRequestSchema),
  postActivity
);
activityRoute.get("/", getActivities);

module.exports = activityRoute;
