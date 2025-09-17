const express = require('express')
const payloadValidator = require('../2_middlewares/payloadValidator.middleware')
const {
  volunteerLoginRequestSchema,
  volunteerSignUpRequestSchema
} = require('../2_middlewares/request_schemas/authRequest.schema')
const {
  postVolunteerLogin,
  postVolunteerSignUp,
  postOrganizerLogin,
  postOrganizerSignUp
} = require('../3_controllers/auth.controller')

const authRoute = express.Router()

// VOLUNTEERS
authRoute.post('/voluntario/iniciar_sesion', payloadValidator(volunteerLoginRequestSchema), postVolunteerLogin)
authRoute.post('/voluntario/registro', payloadValidator(volunteerSignUpRequestSchema), postVolunteerSignUp)

// ORGANIZERS
authRoute.post('/organizador/iniciar_sesion', payloadValidator(volunteerLoginRequestSchema), postOrganizerLogin)
authRoute.post('/organizador/registro', payloadValidator(volunteerSignUpRequestSchema), postOrganizerSignUp)

module.exports = authRoute