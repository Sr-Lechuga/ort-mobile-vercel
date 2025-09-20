const express = require('express')
const payloadValidator = require('../2_middlewares/payloadValidator.middleware')
const { postActivityByOrganizer } = require('../3_controllers/organizer.controller')
const { activityPostRequestSchema } = require('../2_middlewares/request_schemas/acitivityRequest.schema')

const organizerRoute = express.Router()

organizerRoute.post('/activity', payloadValidator(activityPostRequestSchema), postActivityByOrganizer)

module.exports = organizerRoute