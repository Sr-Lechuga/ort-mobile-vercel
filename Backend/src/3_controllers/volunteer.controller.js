const { deleteInscriptionService } = require("../4_services/volunteer.service")


const deleteInscription = async (req, res, next) => {
  try {
    const { id } = req.session
    const { inscriptionId } = req.params

    await deleteInscriptionService(id, inscriptionId)

    res.status(200).json({ message: "Desinscripción realizada con éxito" })
  }
  catch (err) {
    err.placeOfError = "Error en borrar inscripcion desde volunteer";
    next(err)
  }
}

module.exports = {
  deleteInscription
}