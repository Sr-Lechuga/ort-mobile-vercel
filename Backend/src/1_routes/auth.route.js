const express = require("express");
const payloadValidator = require("../2_middlewares/payloadValidator.middleware");
const { volunteerLoginRequestSchema, volunteerSignUpRequestSchema, organizerLoginRequestSchema, organizerSignUpRequestSchema } = require("../2_middlewares/request_schemas/authRequest.schema");
const { postVolunteerLogin, postVolunteerSignUp, postOrganizerLogin, postOrganizerSignUp } = require("../3_controllers/auth.controller");

const authRoute = express.Router();

// VOLUNTEERS
authRoute.post("/volunteers/login", payloadValidator(volunteerLoginRequestSchema), postVolunteerLogin);
authRoute.post("/volunteers/register", payloadValidator(volunteerSignUpRequestSchema), postVolunteerSignUp);

// ORGANIZERS
authRoute.post("/organizers/login", payloadValidator(organizerLoginRequestSchema), postOrganizerLogin);
authRoute.post("/organizers/register", payloadValidator(organizerSignUpRequestSchema), postOrganizerSignUp);

module.exports = authRoute;
