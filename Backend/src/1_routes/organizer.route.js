const express = require("express");
const verifySesion = require("../2_middlewares/verifySesion.middleware");
const payloadValidator = require("../2_middlewares/payloadValidator.middleware");
const verifyAccessLevel = require("../2_middlewares/verifyAccessLevel.middleware");
const { USER_VOLUNTEER } = require("../utils/constants");
const { organizerCommentCreateSchema } = require("../2_middlewares/request_schemas/organizerCommentRequest.schema");
const { postOrganizerComment, getOrganizerComments, getOrganizerPublicProfileController } = require("../3_controllers/organizer.controller");

const organizerRoute = express.Router();

// Public
organizerRoute.get("/:organizerId/comments", getOrganizerComments);

// Private
organizerRoute.use(verifySesion);

organizerRoute.post("/:organizerId/comments", payloadValidator(organizerCommentCreateSchema), verifyAccessLevel([USER_VOLUNTEER]), postOrganizerComment);
organizerRoute.get("/:organizerId/public-profile", getOrganizerPublicProfileController);

module.exports = organizerRoute;
