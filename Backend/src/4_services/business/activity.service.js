const { findActivities, insertActivity, findActivityById, updateActivity } = require("../../5_repositories/adapters/mongoose/activity.repository");
const { createDate } = require("../../utils/datesHandler");
const { bufferElementLimit, bufferOffset } = require("../helpers/requestParameters.helper");
const cacheService = require("../cache/cache.service");
const { generateActivitiesCacheKey, generateActivityCacheKey, generateCachePattern } = require("../helpers/cacheKey.helper");
const { CACHE_TTL } = require("../../utils/constants");

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
  const cacheKey = generateActivitiesCacheKey(requestQuery);
  let activities = await cacheService.get(cacheKey);

  if (!activities) {
    // Si no está en cache, ejecutar consulta original
    const filters = {};
    const { category, location, minDate, maxDate, page = process.env.DEFAULT_PAGE || DEFAULT_PAGE, limit = process.env.DEFAULT_ELEMENT_LIMIT || DEFAULT_ELEMENT_LIMIT } = requestQuery;

    // -------------------------------------------------------------------------------- Filters
    if (category) filters.category = category;
    if (location) filters.location = new RegExp(location, "i"); // 'i' = Case insensitive

    if (minDate) {
      const isValid = createDate(minDate);
      if (isValid) filters.date = { $gte: isValid };
    }
    if (maxDate) {
      const isValid = createDate(maxDate);
      if (isValid) filters.date = { ...(filters.date || {}), $lte: isValid };
    }

    // -------------------------------------------------------------------------------- Pagination
    let elements = bufferElementLimit(limit);
    let offset = bufferOffset(page, limit);
    const pagination = { skip: offset, limit: elements };

    // -------------------------------------------------------------------------------- Request
    activities = await findActivities(filters, pagination);

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

  return newActivity;
};

const activityUpdate = async (activityId, activityData) => {
  const newData = await updateActivity(activityId, activityData);

  // Invalidar cache específico de la actividad actualizada
  const activityCacheKey = generateActivityCacheKey(activityId);
  const activitiesPattern = generateCachePattern("activities");

  await cacheService.deleteMultiple([activityCacheKey, activitiesPattern]);

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

  return deletedActivity;
};

module.exports = {
  activitySelectById,
  activitiesSelect,
  activityInsert,
  activityUpdate,
  activityLogicalDelete,
};
