const BaseBadgeStrategy = require("./BaseBadge.strategy");
const { countActivityCommentsByVolunteer } = require("../../../5_repositories/adapters/mongoose/activityComment.repository");
const { countOrganizerCommentsByVolunteer } = require("../../../5_repositories/adapters/mongoose/organizerComment.repository");

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
    const [activityComments, organizerComments] = await Promise.all([
      countActivityCommentsByVolunteer(volunteerId),
      countOrganizerCommentsByVolunteer(volunteerId),
    ]);

    return activityComments + organizerComments;
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
