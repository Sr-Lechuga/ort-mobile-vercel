const { findActivityInstanceById } = require("../../5_repositories/adapters/mongoose/activityInstance.repository");

/**
 * Actualiza el estado de inscripciones abiertas de una instancia de actividad
 * Calcula si hay cupos disponibles basándose en el número de inscripciones aceptadas
 * @param {string} instanceId - ID de la instancia de actividad a actualizar
 * @returns {Promise<void>} - No retorna valor
 */
const updateInstanceInscriptionsOpen = async (instanceId) => {
  const instance = await findActivityInstanceById(instanceId);
  await instance.populate("inscriptions");
  const { slots, inscriptions } = instance;

  if (slots === null || slots === undefined) return;

  const nAccepted = inscriptions.filter((ins) => ins.accepted).length;

  instance.inscriptionsOpen = slots > nAccepted;
  await instance.save();
};

module.exports = {
  updateInstanceInscriptionsOpen,
};
