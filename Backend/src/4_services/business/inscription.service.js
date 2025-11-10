const { findInscriptionById, inscriptionAttendanceUpdate } = require("../../5_repositories/adapters/mongoose/inscription.repository");
const cacheService = require("../cache/cache.service");
const { generateVolunteerPublicProfileCacheKey } = require("../helpers/cacheKey.helper");
const badgeService = require("./badge.service");

/**
 * Actualiza la asistencia de una inscripción y verifica si se deben otorgar badges
 * @param {string} inscriptionId - ID de la inscripción
 * @param {string} instanceId - ID de la instancia
 * @param {boolean} assisted - Estado de asistencia
 * @returns {Promise<Object>} - Inscripción actualizada
 */
const updateInscriptionAttendance = async (inscriptionId, instanceId, assisted) => {
  // Validar que la inscripción existe
  const inscription = await findInscriptionById(inscriptionId);
  if (!inscription) {
    throw new Error("Inscripción no encontrada");
  }

  // Validar que la inscripción está aceptada
  if (!inscription.accepted) {
    throw new Error("Inscripción no aceptada");
  }

  // Validar que la inscripción pertenece a la instancia
  if (inscription.instance.toString() !== instanceId) {
    throw new Error("Inscripción no pertenece a la instancia");
  }

  // Actualizar la asistencia
  const updatedInscription = await inscriptionAttendanceUpdate(inscriptionId, assisted);
  await cacheService.delete(generateVolunteerPublicProfileCacheKey(String(inscription.volunteer)));

  // Si se está marcando asistencia (assisted = true), verificar si corresponde otorgar badges
  if (assisted) {
    try {
      // Verificar y otorgar badges automáticamente
      await badgeService.checkAndAwardBadges(inscription.volunteer);
    } catch (error) {
      // No fallar la actualización de asistencia si falla el cálculo de badges
      console.error("Error al verificar badges:", error.message);
    }
  }

  return updatedInscription;
};

module.exports = {
  updateInscriptionAttendance,
};
