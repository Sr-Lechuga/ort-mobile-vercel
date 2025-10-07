const express = require('express')
const verifySesion = require('../2_middlewares/verifySesion.middleware')
const verifyAccessLevel = require('../2_middlewares/verifyAccessLevel.middleware')
const { USER_VOLUNTEER } = require('../utils/constants')
const Inscription = require('../models/inscription.model')
const { deleteInscription } = require('../3_controllers/volunteer.controller')

const volunteerRoute = express.Router()

// Public
// volunteer profile ***************

// Private
volunteerRoute.use(verifySesion)

volunteerRoute.delete("/inscripciones/:inscriptionId", verifyAccessLevel([USER_VOLUNTEER]), deleteInscription)