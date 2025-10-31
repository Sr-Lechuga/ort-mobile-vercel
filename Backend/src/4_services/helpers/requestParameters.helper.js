const { DEFAULT_ELEMENT_LIMIT, DEFAULT_PAGE } = require("../../utils/constants");

/**
 * Calcula el offset para paginación basándose en la página y límite
 * Aplica límites de seguridad al número de elementos por página
 * @param {number} page - Número de página (se ajusta a DEFAULT_PAGE si es <= 0)
 * @param {number} limit - Límite de elementos por página
 * @returns {number} - Offset calculado para la consulta
 */
const bufferOffset = (page, limit) => {
  limit = bufferElementLimit(limit);
  page = page <= 0 ? (process.env.DEFAULT_PAGE ? parseInt(process.env.DEFAULT_PAGE) : DEFAULT_PAGE) : page;
  return (parseInt(page) - 1) * parseInt(limit);
};

/**
 * Aplica límites de seguridad al número de elementos por página
 * Establece un máximo configurable mediante DEFAULT_ELEMENT_LIMIT
 * @param {number} limit - Límite solicitado
 * @returns {number} - Límite ajustado (usa DEFAULT_ELEMENT_LIMIT si es inválido)
 */
const bufferElementLimit = (limit) => {
  const maxLimit = process.env.DEFAULT_ELEMENT_LIMIT ? parseInt(process.env.DEFAULT_ELEMENT_LIMIT) : DEFAULT_ELEMENT_LIMIT;
  return limit <= 0 || limit > maxLimit ? maxLimit : limit;
};

/**
 * Genera un filtro de geolocalización para consultas MongoDB
 * Crea un filtro $near para buscar documentos dentro de un radio específico
 * @param {number|string} lat - Latitud del punto central
 * @param {number|string} lng - Longitud del punto central
 * @param {number|string} radius - Radio de búsqueda en metros
 * @returns {Object|null} - Filtro MongoDB $near o null si faltan parámetros
 */
const geoLocationRadiusFilter = (lat, lng, radius) => {
  if (lat && lng && radius) {
    return {
      geoLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius, 10), // in meters
        },
      },
    };
  }
  return null;
};

module.exports = {
  bufferOffset,
  bufferElementLimit,
  geoLocationRadiusFilter,
};
