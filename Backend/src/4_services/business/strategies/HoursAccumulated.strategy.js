const BaseBadgeStrategy = require("./BaseBadge.strategy");
const Inscription = require("../../../5_repositories/adapters/mongoose/models/inscription.model");
const ActivityInstance = require("../../../5_repositories/adapters/mongoose/models/activityInstance.model");

/**
 * Estrategia para calcular badges basados en horas acumuladas de participación
 * Suma las duraciones de todas las actividades en las que el voluntario asistió
 */
class HoursAccumulatedStrategy extends BaseBadgeStrategy {
  /**
   * Calcula las horas totales acumuladas por el voluntario
   * @param {string} volunteerId - ID del voluntario
   * @returns {Promise<number>} - Horas totales acumuladas
   */
  async calculateValue(volunteerId) {
    // Obtener todas las inscripciones con asistencia verificada
    const inscriptions = await Inscription.find({
      volunteer: volunteerId,
      assisted: true,
    }).populate("instance", "duration");

    // Sumar las duraciones de las instancias asociadas
    let totalHours = 0;
    for (const inscription of inscriptions) {
      if (inscription.instance && inscription.instance.duration) {
        // duration está en minutos según el modelo
        totalHours += inscription.instance.duration;
      }
    }

    // Convertir minutos a horas y devolver
    return totalHours / 60;
  }

  /**
   * Nombre de la estrategia para logging y debugging
   * @returns {string}
   */
  getName() {
    return "HoursAccumulatedStrategy";
  }
}

module.exports = HoursAccumulatedStrategy;
