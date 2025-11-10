const express = require("express");
const verifySesion = require("../2_middlewares/verifySesion.middleware");
const verifyAccessLevel = require("../2_middlewares/verifyAccessLevel.middleware");
const { USER_VOLUNTEER } = require("../utils/constants");
const { deleteInscription, getVolunteerPublicProfile } = require("../3_controllers/volunteer.controller");

const volunteerRoute = express.Router();

// Public
volunteerRoute.get("/:volunteerId/public-profile", getVolunteerPublicProfile);

// Private
volunteerRoute.use(verifySesion);
volunteerRoute.delete("/inscriptions/:inscriptionId", verifyAccessLevel([USER_VOLUNTEER]), deleteInscription);

module.exports = volunteerRoute;
