const BaseBadgeStrategy = require("./BaseBadge.strategy");

/**
 * Estrategia para calcular badges basados en cantidad de comentarios realizados
 * Actualmente retorna 0 porque los comentarios no están implementados
 * Esta estrategia está preparada para cuando se implemente la funcionalidad de comentarios
 */
class CommentCountStrategy extends BaseBadgeStrategy {
  /**
   * Cuenta los comentarios realizados por el voluntario
   * @param {string} volunteerId - ID del voluntario
   * @returns {Promise<number>} - Cantidad de comentarios realizados
   */
  async calculateValue(volunteerId) {
    // TODO: Implementar cuando se agregue la funcionalidad de comentarios
    // const Comment = require("../../../5_repositories/adapters/mongoose/models/comment.model");
    // return await Comment.countDocuments({ volunteer: volunteerId });

    return 0; // Placeholder hasta que se implementen los comentarios
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
