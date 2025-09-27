const express = require('express')
const verifySesion = require('../2_middlewares/verifySesion.middleware')

const volunteerRoute = express.Router()

// Public
// volunteer profile ***************

// Private
volunteerRoute.use(verifySesion)
//volunteerRoute.post()