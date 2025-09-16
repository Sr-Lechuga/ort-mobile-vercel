const express = require('express')
const payloadValidator = require('../2_middlewares/payloadValidator.middleware')
const { loginRequestSchema } = require('../2_middlewares/request_schemas/authRequest.schema')
const { postVolunteerLogin } = require('../3_controllers/auth.controller')

const authRoute = express.Router()

authRoute.post('/voluntario/iniciar_sesion', payloadValidator(loginRequestSchema), postVolunteerLogin)

module.exports = authRoute