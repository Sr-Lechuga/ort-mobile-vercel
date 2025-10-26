const cacheService = require("../../4_services/cache/cache.service");
const { generateOwnershipCacheKey } = require("../../4_services/helpers/cacheKey.helper");
const { CACHE_TTL } = require("../../utils/constants");

/**
 * Verifica si un usuario es propietario de un recurso específico
 * Utiliza cache para optimizar validaciones repetitivas y reducir consultas a la base de datos
 *
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Function} docFindFn - Función para buscar el documento en la base de datos
 * @param {string} docId - ID del documento a verificar
 * @param {string} docModelName - Nombre del modelo del documento (para mensajes de error)
 * @param {string} docOwnerId - ID del usuario que se está verificando como propietario
 * @returns {Promise<boolean>} - true si el usuario es propietario, false si no lo es
 */
const checkOwnership = async (res, docFindFn, docId, docModelName, docOwnerId) => {
  // Generar clave de cache para la validación de ownership
  const cacheKey = generateOwnershipCacheKey(docModelName, docId, docOwnerId);

  // Intentar obtener del cache primero
  let isOwner = await cacheService.get(cacheKey);

  if (isOwner === null) {
    // Si no está en cache, ejecutar validación original
    const doc = await docFindFn(docId);
    if (!doc) {
      res.status(400).json({ message: `El recurso ${docModelName} no existe o es incorrecto` });
      return false;
    }

    // Verificar ownership
    isOwner = doc.owner.toString() === docOwnerId.toString();
    const TTL = process.env.CACHE_TTL_OWNERSHIP_CHECK ? parseInt(process.env.CACHE_TTL_OWNERSHIP_CHECK) : CACHE_TTL.OWNERSHIP_CHECK;
    await cacheService.set(cacheKey, isOwner, TTL);
  }

  // Si no es owner, enviar respuesta de error
  if (!isOwner) {
    res.status(409).json({ message: `El recurso ${docModelName} no te pertenece` });
    return false;
  }

  return true;
};

module.exports = {
  checkOwnership,
};
