const { BADGE_STRATEGIES } = require("../../../utils/constants");
const ParticipationCountStrategy = require("./ParticipationCount.strategy");
const HoursAccumulatedStrategy = require("./HoursAccumulated.strategy");
const CommentCountStrategy = require("./CommentCount.strategy");

/**
 * Factory para crear estrategias de badges basado en el tipo especificado
 * Patrón Factory: Centraliza la creación de objetos
 */
class BadgeStrategyFactory {
  // Registro de estrategias disponibles
  static strategies = {
    [BADGE_STRATEGIES.PARTICIPATION_COUNT]: ParticipationCountStrategy,
    [BADGE_STRATEGIES.HOURS_ACCUMULATED]: HoursAccumulatedStrategy,
    [BADGE_STRATEGIES.COMMENT_COUNT]: CommentCountStrategy,
  };

  /**
   * Crea una instancia de la estrategia correspondiente
   * @param {string} strategyName - Nombre de la estrategia
   * @returns {BaseBadgeStrategy} - Instancia de la estrategia
   * @throws {Error} - Si la estrategia no existe
   */
  static create(strategyName) {
    const StrategyClass = this.strategies[strategyName];

    if (!StrategyClass) {
      throw new Error(`Estrategia desconocida: ${strategyName}`);
    }

    return new StrategyClass();
  }

  /**
   * Verifica si una estrategia existe
   * @param {string} strategyName - Nombre de la estrategia
   * @returns {boolean}
   */
  static exists(strategyName) {
    return strategyName in this.strategies;
  }

  /**
   * Obtiene la lista de todas las estrategias disponibles
   * @returns {string[]}
   */
  static getAvailableStrategies() {
    return Object.keys(this.strategies);
  }
}

module.exports = BadgeStrategyFactory;
