const { findActivities, insertActivity, findActivityById, updateActivity } = require("../../5_repositories/adapters/mongoose/activity.repository");
const { createDate } = require("../../utils/datesHandler");
const { bufferElementLimit, bufferOffset } = require("../helpers/requestParameters.helper");
const cacheService = require("../cache/cache.service");
const { stringCategoriesToArray } = require("../helpers/activity.helper");
const { generateActivitiesCacheKey, generateActivityCacheKey, generateCachePattern, generateOrganizerPublicProfileCacheKey } = require("../helpers/cacheKey.helper");
const { CACHE_TTL, DEFAULT_PAGE, DEFAULT_ELEMENT_LIMIT } = require("../../utils/constants");

/**
 * Función auxiliar para validar y normalizar los parámetros de geolocalización.
 * Retorna un objeto con la query normalizada y las opciones geoespaciales para el repositorio.
 * @param {Object} requestQuery - Query original recibida desde el controlador
 * @returns {{ sanitizedQuery: Object, geoOptions: { coordinates: number[], maxDistanceInMeters: number|null } | null }}
 */
const sanitizeGeoQueryParams = (requestQuery) => {
  const sanitizedQuery = { ...requestQuery };
  const { userLatitude, userLongitude, maxDistance } = requestQuery;

  const latitudeProvided = userLatitude !== undefined && userLatitude !== "";
  const longitudeProvided = userLongitude !== undefined && userLongitude !== "";
  const distanceProvided = maxDistance !== undefined && maxDistance !== "";

  if (!latitudeProvided && !longitudeProvided && !distanceProvided) {
    delete sanitizedQuery.userLatitude;
    delete sanitizedQuery.userLongitude;
    delete sanitizedQuery.maxDistance;
    return { sanitizedQuery, geoOptions: null };
  }

  if (!latitudeProvided || !longitudeProvided) {
    throw new Error("ERROR 020, Debes enviar latitud y longitud para calcular distancias");
  }

  const latitude = Number(userLatitude);
  const longitude = Number(userLongitude);

  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    throw new Error("ERROR 020, La latitud debe estar entre -90 y 90 grados");
  }

  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    throw new Error("ERROR 020, La longitud debe estar entre -180 y 180 grados");
  }

  let parsedMaxDistance = null;
  if (distanceProvided) {
    parsedMaxDistance = Number(maxDistance);

    if (!Number.isFinite(parsedMaxDistance)) {
      throw new Error("ERROR 020, La distancia máxima debe ser un número");
    }

    if (parsedMaxDistance < 1 || parsedMaxDistance > 100) {
      throw new Error("ERROR 020, La distancia máxima permitida es entre 1 y 100 kilómetros");
    }
  }

  sanitizedQuery.userLatitude = latitude.toFixed(6);
  sanitizedQuery.userLongitude = longitude.toFixed(6);

  if (parsedMaxDistance !== null) {
    sanitizedQuery.maxDistance = parsedMaxDistance.toFixed(3);
  } else {
    delete sanitizedQuery.maxDistance;
  }

  return {
    sanitizedQuery,
    geoOptions: {
      coordinates: [longitude, latitude],
      maxDistanceInMeters: parsedMaxDistance ? parsedMaxDistance * 1000 : null,
    },
  };
};

const activitySelectById = async (id) => {
  const cacheKey = generateActivityCacheKey(id);
  let activity = await cacheService.get(cacheKey);

  if (!activity) {
    // Si no está en cache, ejecutar consulta a la base de datos
    activity = await findActivityById(id);

    if (activity) {
      // Guardar en cache por el TTL configurado desde .env
      const TTL = process.env.CACHE_TTL_ACTIVITY_DETAIL ? parseInt(process.env.CACHE_TTL_ACTIVITY_DETAIL) : CACHE_TTL.ACTIVITY_DETAIL;
      await cacheService.set(cacheKey, activity, TTL);
    }
  }

  return activity;
};

const activitiesSelect = async (requestQuery) => {
  const { sanitizedQuery, geoOptions } = sanitizeGeoQueryParams(requestQuery);
  const cacheKey = generateActivitiesCacheKey(sanitizedQuery);
  let activities = await cacheService.get(cacheKey);

  if (!activities) {
    // Si no está en cache, ejecutar consulta original
    const filterConditions = [];
    const { category, categories, status, location, minDate, maxDate, page, limit } = sanitizedQuery;
    const categoriesInput = categories ?? category;

    // -------------------------------------------------------------------------------- Filtros principales
    if (categoriesInput) {
      const categoriesArray = stringCategoriesToArray(categoriesInput);

      if (categoriesArray.length) {
        filterConditions.push({ categories: { $in: categoriesArray } });
      }
    }

    if (status) {
      filterConditions.push({ status });
    }

    if (location) {
      const locationRegex = new RegExp(location, "i");
      filterConditions.push({
        $or: [{ "location.country": locationRegex }, { "location.city": locationRegex }, { "location.address": locationRegex }],
      });
    }

    // -------------------------------------------------------------------------------- Filtros por fecha (campo date)
    const dateFilter = {};

    if (minDate) {
      const isValid = createDate(minDate);
      if (isValid) dateFilter.$gte = isValid;
    }
    if (maxDate) {
      const isValid = createDate(maxDate);
      if (isValid) dateFilter.$lte = isValid;
    }

    if (Object.keys(dateFilter).length) {
      filterConditions.push({ date: dateFilter });
    }

    const filters = filterConditions.length ? { $and: filterConditions } : {};

    // -------------------------------------------------------------------------------- Pagination
    let elements = bufferElementLimit(limit || process.env.DEFAULT_ELEMENT_LIMIT || DEFAULT_ELEMENT_LIMIT);
    let offset = bufferOffset(page || process.env.DEFAULT_PAGE || DEFAULT_PAGE, limit || process.env.DEFAULT_ELEMENT_LIMIT || DEFAULT_ELEMENT_LIMIT);
    const pagination = { skip: parseInt(offset), limit: parseInt(elements) };

    // -------------------------------------------------------------------------------- Request
    activities = await findActivities(filters, pagination, geoOptions);

    // Guardar en cache por el TTL configurado desde .env
    const TTL = process.env.CACHE_TTL_ACTIVITIES_LIST ? parseInt(process.env.CACHE_TTL_ACTIVITIES_LIST) : CACHE_TTL.ACTIVITIES_LIST;
    await cacheService.set(cacheKey, activities, TTL);
  }

  return activities;
};

const activityInsert = async (activityData) => {
  const newActivity = await insertActivity(activityData);

  // Invalidar cache de listas de actividades cuando se crea una nueva
  const activitiesPattern = generateCachePattern("activities");
  await cacheService.deleteMultiple([activitiesPattern]);

  if (newActivity?.owner) {
    await cacheService.delete(generateOrganizerPublicProfileCacheKey(String(newActivity.owner)));
  }

  return newActivity;
};

const activityUpdate = async (activityId, activityData) => {
  const newData = await updateActivity(activityId, activityData);

  // Invalidar cache específico de la actividad actualizada
  const activityCacheKey = generateActivityCacheKey(activityId);
  const activitiesPattern = generateCachePattern("activities");

  await cacheService.deleteMultiple([activityCacheKey, activitiesPattern]);

  if (newData?.owner) {
    await cacheService.delete(generateOrganizerPublicProfileCacheKey(String(newData.owner)));
  }

  return newData;
};

const activityLogicalDelete = async (activityId) => {
  // Cambiar el estado de la actividad a "inactiva"
  const activityData = { status: "inactiva" };
  const deletedActivity = await updateActivity(activityId, activityData);

  // Invalidar cache específico de la actividad eliminada
  const activityCacheKey = generateActivityCacheKey(activityId);
  const activitiesPattern = generateCachePattern("activities");

  await cacheService.deleteMultiple([activityCacheKey, activitiesPattern]);

  if (deletedActivity?.owner) {
    await cacheService.delete(generateOrganizerPublicProfileCacheKey(String(deletedActivity.owner)));
  }

  return deletedActivity;
};

module.exports = {
  activitySelectById,
  activitiesSelect,
  activityInsert,
  activityUpdate,
  activityLogicalDelete,
};
