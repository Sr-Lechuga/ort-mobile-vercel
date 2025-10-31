/**
 * Clase abstracta que define la interfaz para todas las estrategias de badges
 * Patrón Strategy: Define el contrato que todas las estrategias deben cumplir
 */
class BaseBadgeStrategy {
  /**
   * Calcula el valor actual del usuario según la métrica de esta estrategia
   * @param {string} volunteerId - ID del voluntario
   * @returns {Promise<number>} - Valor actual calculado
   * @throws {Error} - Si no está implementada por la clase hija
   */
  async calculateValue(volunteerId) {
    throw new Error("calculateValue debe ser implementada por la clase hija");
  }
}

module.exports = BaseBadgeStrategy;
