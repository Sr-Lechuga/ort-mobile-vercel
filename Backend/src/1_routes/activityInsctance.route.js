const express = require("express");
const {
  getActivityInstances,
  //postActivityInstances,
} = require("../3_controllers/activityInstance.controller");
/*
const {
  activityInstancePostRequestSchema,
} = require("../2_middlewares/request_schemas/activityInstanceRequest.schema");
 */
//const payloadValidator = require("../2_middlewares/payloadValidator.middleware");

const activityInstanceRoute = express.Router();

activityInstanceRoute.get("/", getActivityInstances);

module.exports = activityInstanceRoute;

/*
activityInstanceRoute.post(
  "/",
  payloadValidator(activityInstancePostRequestSchema),
  postActivityInstances
);
*/

// activityInstanceRoute.put(
//   "/",
//   payloadValidator(activityInstancePostRequestSchema),
//   putActivityInstances
// );

//activityInstanceRoute.delete("/", deleteInstancePostRequestSchema);