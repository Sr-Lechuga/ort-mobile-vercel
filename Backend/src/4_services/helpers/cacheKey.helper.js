/**
 * Helper para generar claves de cache consistentes
 * Asegura que consultas equivalentes generen la misma clave
 */

/**
 * Genera una clave de cache consistente para consultas de actividades
 * Normaliza y ordena los parámetros para asegurar consistencia en las claves
 * @param {Object} requestQuery - Parámetros de la consulta (category, location, maxDate, minDate, limit, page)
 * @returns {string} - Clave de cache consistente con formato "activities:param1:value1|param2:value2"
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
 * @returns {string} - Clave de cache con formato "activity:activityId"
 */
const generateActivityCacheKey = (activityId) => {
  return `activity:${activityId}`;
};

/**
 * Genera una clave de cache para una instancia de actividad específica
 * @param {string} instanceId - ID de la instancia
 * @returns {string} - Clave de cache con formato "activity_instance:instanceId"
 */
const generateActivityInstanceCacheKey = (instanceId) => {
  return `activity_instance:${instanceId}`;
};

/**
 * Genera una clave de cache para validación de ownership
 * @param {string} resourceType - Tipo de recurso (activity, activity_instance, etc.)
 * @param {string} resourceId - ID del recurso
 * @param {string} userId - ID del usuario
 * @returns {string} - Clave de cache con formato "ownership:resourceType:resourceId:userId"
 */
const generateOwnershipCacheKey = (resourceType, resourceId, userId) => {
  return `ownership:${resourceType}:${resourceId}:${userId}`;
};

/**
 * Genera una clave de cache para perfiles públicos de voluntarios
 * @param {string} volunteerId - ID del voluntario
 * @returns {string} - Clave de cache con formato "volunteer_public_profile:volunteerId"
 */
const generateVolunteerPublicProfileCacheKey = (volunteerId) => {
  return `volunteer_public_profile:${volunteerId}`;
};

/**
 * Genera una clave de cache para perfiles públicos de organizadores
 * @param {string} organizerId - ID del organizador
 * @returns {string} - Clave de cache con formato "organizer_public_profile:organizerId"
 */
const generateOrganizerPublicProfileCacheKey = (organizerId) => {
  return `organizer_public_profile:${organizerId}`;
};

/**
 * Genera patrón de claves para invalidación masiva
 * @param {string} prefix - Prefijo de las claves a invalidar
 * @returns {string} - Patrón de claves con formato "prefix:*"
 */
const generateCachePattern = (prefix) => {
  return `${prefix}:*`;
};

module.exports = {
  generateActivitiesCacheKey,
  generateActivityCacheKey,
  generateActivityInstanceCacheKey,
  generateOwnershipCacheKey,
  generateVolunteerPublicProfileCacheKey,
  generateOrganizerPublicProfileCacheKey,
  generateCachePattern,
};
