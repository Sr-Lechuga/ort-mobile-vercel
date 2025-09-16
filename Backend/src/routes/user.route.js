const express = require('express');
const { loginVolunteer } = require('../controllers/user.controller.js')
const { payloadValidator } = require('../middlewares/payloadValidator.middleware')
const { volunteerLoginSchema } = require('../models/validations/users.schema.js')

const userRoute = express.Router()

userRoute.post('/volunteer/login', payloadValidator(volunteerLoginSchema), loginVolunteer)

module.exports = {
  userRoute
}