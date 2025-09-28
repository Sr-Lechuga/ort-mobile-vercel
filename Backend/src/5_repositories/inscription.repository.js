const mongoose = require("mongoose")
const Inscription = require("../models/inscription.model")

const insertInscription = async (inscriptionData) => {
  const newInscription = await Inscription.create(inscriptionData)
  return newInscription
}

module.exports = {
  insertInscription
}