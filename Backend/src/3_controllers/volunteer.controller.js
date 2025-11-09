const { deleteInscriptionService, getVolunteerPublicProfile } = require("../4_services/business/volunteer.service");

const deleteInscription = async (req, res, next) => {
  try {
    const { id } = req.session;
    const { inscriptionId } = req.params;

    await deleteInscriptionService(id, inscriptionId);

    res.status(200).json({ message: "Desinscripción realizada con éxito" });
  } catch (err) {
    err.placeOfError = "Error en borrar inscripcion desde volunteer";
    next(err);
  }
};

const getVolunteerPublicProfileController = async (req, res, next) => {
  try {
    const { volunteerId } = req.params;
    const profile = await getVolunteerPublicProfile(volunteerId);

    if (!profile) {
      return res.status(404).json({
        message: "Voluntario no encontrado",
      });
    }

    res.status(200).json({
      message: "Perfil público del voluntario obtenido con éxito",
      volunteer: profile,
    });
  } catch (err) {
    err.placeOfError = "Error en obtener perfil público de voluntario";
    next(err);
  }
};

module.exports = {
  deleteInscription,
  getVolunteerPublicProfileController,
};
