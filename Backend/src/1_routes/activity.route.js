const express = require('express')
const { getActivities } = require('../3_controllers/activity.controller')

const activityRoute = express.Router()

activityRoute.get('/', getActivities)

module.exports = activityRoute