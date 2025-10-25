/**
 * Helper para generar claves de cache consistentes
 * Asegura que consultas equivalentes generen la misma clave
 */

/**
 * Genera una clave de cache consistente para consultas de actividades
 * @param {Object} requestQuery - Parámetros de la consulta
 * @returns {string} - Clave de cache consistente
 */
const generateActivitiesCacheKey = (requestQuery) => {
  // Normalizar y ordenar los parámetros para consistencia
  const normalizedQuery = {
    // Parámetros de filtro (ordenados alfabéticamente)
    category: requestQuery.category || null,
    location: requestQuery.location || null,
    maxDate: requestQuery.maxDate || null,
    minDate: requestQuery.minDate || null,

    // Parámetros de paginación (ordenados alfabéticamente)
    limit: parseInt(requestQuery.limit) || 10,
    page: parseInt(requestQuery.page) || 1,
  };

  // Eliminar propiedades null/undefined para evitar inconsistencias
  const cleanQuery = Object.entries(normalizedQuery)
    .filter(([key, value]) => value !== null && value !== undefined)
    .reduce((cleanObject, [key, value]) => {
      cleanObject[key] = value;
      return cleanObject;
    }, {});

  // Generar clave consistente
  const queryString = Object.keys(cleanQuery)
    .sort() // Ordenar claves alfabéticamente
    .map((key) => `${key}:${cleanQuery[key]}`)
    .join("|");

  return `activities:${queryString}`;
};

/**
 * Genera una clave de cache para una actividad específica
 * @param {string} activityId - ID de la actividad
 * @returns {string} - Clave de cache
 */
const generateActivityCacheKey = (activityId) => {
  return `activity:${activityId}`;
};

/**
 * Genera una clave de cache para una instancia de actividad específica
 * @param {string} instanceId - ID de la instancia
 * @returns {string} - Clave de cache
 */
const generateActivityInstanceCacheKey = (instanceId) => {
  return `activity_instance:${instanceId}`;
};

/**
 * Genera una clave de cache para validación de ownership
 * @param {string} resourceType - Tipo de recurso (activity, activity_instance, etc.)
 * @param {string} resourceId - ID del recurso
 * @param {string} userId - ID del usuario
 * @returns {string} - Clave de cache
 */
const generateOwnershipCacheKey = (resourceType, resourceId, userId) => {
  return `ownership:${resourceType}:${resourceId}:${userId}`;
};

/**
 * Genera patrón de claves para invalidación masiva
 * @param {string} prefix - Prefijo de las claves a invalidar
 * @returns {string} - Patrón de claves
 */
const generateCachePattern = (prefix) => {
  return `${prefix}:*`;
};

module.exports = {
  generateActivitiesCacheKey,
  generateActivityCacheKey,
  generateActivityInstanceCacheKey,
  generateOwnershipCacheKey,
  generateCachePattern,
};
