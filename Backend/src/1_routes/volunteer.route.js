const express = require("express");
const verifySesion = require("../2_middlewares/verifySesion.middleware");
const verifyAccessLevel = require("../2_middlewares/verifyAccessLevel.middleware");
const { USER_VOLUNTEER } = require("../utils/constants");
const { deleteInscription, getVolunteerPublicProfileController } = require("../3_controllers/volunteer.controller");

const volunteerRoute = express.Router();

// Public

// Private
volunteerRoute.use(verifySesion);
volunteerRoute.delete("/inscriptions/:inscriptionId", verifyAccessLevel([USER_VOLUNTEER]), deleteInscription);
volunteerRoute.get("/:volunteerId/public-profile", getVolunteerPublicProfileController);

module.exports = volunteerRoute;
