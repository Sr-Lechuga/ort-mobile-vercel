const BaseBadgeStrategy = require("./BaseBadge.strategy");
const { countCommentsByVolunteer } = require("../../../5_repositories/adapters/mongoose/comment.repository");

/**
 * Estrategia para calcular badges basados en cantidad de comentarios realizados
 */
class CommentCountStrategy extends BaseBadgeStrategy {
  /**
   * Cuenta los comentarios realizados por el voluntario
   * @param {string} volunteerId - ID del voluntario
   * @returns {Promise<number>} - Cantidad de comentarios realizados
   */
  async calculateValue(volunteerId) {
    return await countCommentsByVolunteer(volunteerId);
  }

  /**
   * Nombre de la estrategia para logging y debugging
   * @returns {string}
   */
  getName() {
    return "CommentCountStrategy";
  }
}

module.exports = CommentCountStrategy;
