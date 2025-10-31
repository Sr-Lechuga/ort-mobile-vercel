const { findActiveBadges } = require("../../5_repositories/adapters/mongoose/badge.repository");
const { findVolunteerById, updateVolunteer, findVolunteerByIdWithBadges } = require("../../5_repositories/adapters/mongoose/volunteer.repository");
const BadgeStrategyFactory = require("./strategies/BadgeStrategy.factory");

/**
 * Servicio para la gestión de badges
 * Patrón Strategy: Orquesta el cálculo y otorgamiento de badges
 */
class BadgeService {
  /**
   * Evalúa si un voluntario cumple las condiciones para recibir badges nuevos
   * y otorga aquellos que correspondan
   * @param {string} volunteerId - ID del voluntario
   * @returns {Promise<Array>} - Lista de badges nuevos otorgados
   */
  async checkAndAwardBadges(volunteerId) {
    try {
      // Obtener todos los badges activos del sistema
      const activeBadges = await findActiveBadges();

      // Obtener el voluntario con sus badges actuales
      const volunteer = await findVolunteerById(volunteerId);
      if (!volunteer) {
        throw new Error("Voluntario no encontrado");
      }

      const alreadyEarnedIds = new Set(volunteer.badgesEarned.map((b) => b.badgeId));
      const newlyAwardedBadges = [];

      // Evaluar cada badge activo
      for (const badge of activeBadges) {
        // Saltar si ya tiene el badge
        if (alreadyEarnedIds.has(badge.badgeId)) {
          continue;
        }

        // Crear la estrategia correspondiente
        const strategy = BadgeStrategyFactory.create(badge.strategy);

        // Calcular el valor actual del usuario según la estrategia
        const currentValue = await strategy.calculateValue(volunteerId);

        // Verificar si cumple el umbral definido en la configuración
        const threshold = badge.strategyConfig?.threshold || badge.strategyConfig?.countRequired || badge.strategyConfig?.hoursRequired;

        if (threshold !== undefined && currentValue >= threshold) {
          // Otorgar el badge
          await this.awardBadge(volunteerId, badge.badgeId, {
            currentValue,
            strategy: strategy.getName(),
          });

          newlyAwardedBadges.push({
            badgeId: badge.badgeId,
            title: badge.title,
            description: badge.description,
            imageUrl: badge.imageUrl,
          });
        }
      }

      return newlyAwardedBadges;
    } catch (error) {
      error.placeOfError = "Error en checkAndAwardBadges";
      throw error;
    }
  }

  /**
   * Otorga un badge específico a un voluntario
   * @param {string} volunteerId - ID del voluntario
   * @param {string} badgeId - ID del badge a otorgar
   * @param {object} metadata - Metadatos adicionales
   * @returns {Promise<void>}
   */
  async awardBadge(volunteerId, badgeId, metadata = {}) {
    try {
      const badgeToAdd = {
        badgeId,
        obtainedAt: new Date(),
        metadata,
      };

      await updateVolunteer(volunteerId, {
        $push: { badgesEarned: badgeToAdd },
      });
    } catch (error) {
      error.placeOfError = "Error en awardBadge";
      throw error;
    }
  }

  /**
   * Obtiene los badges de un voluntario
   * @param {string} volunteerId - ID del voluntario
   * @returns {Promise<Array>} - Lista de badges del voluntario
   */
  async getVolunteerBadges(volunteerId) {
    try {
      const volunteer = await findVolunteerByIdWithBadges(volunteerId);

      if (!volunteer) {
        throw new Error("Voluntario no encontrado");
      }

      return volunteer.badgesEarned || [];
    } catch (error) {
      error.placeOfError = "Error en getVolunteerBadges";
      throw error;
    }
  }

  /**
   * Obtiene todos los badges disponibles en el sistema
   * @returns {Promise<Array>} - Lista de badges
   */
  async getAllBadges() {
    try {
      return await findActiveBadges();
    } catch (error) {
      error.placeOfError = "Error en getAllBadges";
      throw error;
    }
  }
}

module.exports = new BadgeService();
