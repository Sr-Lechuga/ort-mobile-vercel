const { findInscriptionById } = require("../../5_repositories/adapters/mongoose/inscription.repository");

const updateInscriptionAttendance = async (inscriptionId, instanceId, assisted) => {
  const inscription = await findInscriptionById(inscriptionId);
  if (!inscription) {
    throw new Error("Inscripción no encontrada");
  }
  if (!inscription.accepted) {
    throw new Error("Inscripción no aceptada");
  }
  if (inscription.instance.toString() !== instanceId) {
    throw new Error("Inscripción no pertenece a la instancia");
  }
  const newInscription = await updateInscriptionAttendance(inscriptionId, assisted);
  return newInscription;
};

module.exports = {
  updateInscriptionAttendance,
};
