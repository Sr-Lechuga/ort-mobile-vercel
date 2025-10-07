const Inscription = require("../models/inscription.model")

const findInscriptionById = async (id) => {
  const inscription = await Inscription.findById(id)
  return inscription
}

const insertInscription = async (inscriptionData) => {
  const newInscription = await Inscription.create(inscriptionData)
  return newInscription
}

const deleteInscriptionById = async (id) => {
  await Inscription.findByIdAndDelete(id)
}

module.exports = {
  insertInscription,
  deleteInscriptionById,
  findInscriptionById
}