const express = require("express");
const verifySesion = require("../2_middlewares/verifySesion.middleware");

const organizerRoute = express.Router();
organizerRoute.use(verifySesion);

//organizerRoute.post('/activity', payloadValidator(activityPostRequestSchema), postActivityByOrganizer)

module.exports = organizerRoute;
