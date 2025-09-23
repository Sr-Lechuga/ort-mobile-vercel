const express = require("express");
const {
  getActivityInstances,
} = require("../3_controllers/activityInstance.controller");

const activityInstanceRoute = express.Router();

//activityInstanceRoute.post("/",  payloadValidator(volunteerLoginRequestSchema),  postActivityInstances);
//activityInstanceRoute.put("/", getActivityInstances);
activityInstanceRoute.get("/", getActivityInstances);
//activityInstanceRoute.delete("/", getActivityInstances);

module.exports = activityInstanceRoute;
