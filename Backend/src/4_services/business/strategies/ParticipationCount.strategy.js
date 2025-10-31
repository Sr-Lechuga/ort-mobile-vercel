const BaseBadgeStrategy = require("./BaseBadge.strategy");
const Inscription = require("../../../5_repositories/adapters/mongoose/models/inscription.model");

/**
 * Estrategia para calcular badges basados en cantidad de participaciones certificadas
 * Cuenta cuántas inscripciones tienen assisted = true
 */
class ParticipationCountStrategy extends BaseBadgeStrategy {
  /**
   * Cuenta las participaciones certificadas del voluntario
   * @param {string} volunteerId - ID del voluntario
   * @returns {Promise<number>} - Cantidad de participaciones certificadas
   */
  async calculateValue(volunteerId) {
    const count = await Inscription.countDocuments({
      volunteer: volunteerId,
      assisted: true,
    });

    return count;
  }

  /**
   * Nombre de la estrategia para logging y debugging
   * @returns {string}
   */
  getName() {
    return "ParticipationCountStrategy";
  }
}

module.exports = ParticipationCountStrategy;
