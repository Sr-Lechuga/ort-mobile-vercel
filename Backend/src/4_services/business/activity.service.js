const { findActivities, insertActivity, findActivityById, updateActivity } = require("../../5_repositories/adapters/mongoose/activity.repository");
const { createDate } = require("../../utils/datesHandler");
const { bufferElementLimit, bufferOffset } = require("../helpers/requestParameters.helper");
const cacheService = require("../cache/cache.service");
const { stringCategoriesToArray } = require("../helpers/activity.helper");
const { generateActivitiesCacheKey, generateActivityCacheKey, generateCachePattern, generateOrganizerPublicProfileCacheKey } = require("../helpers/cacheKey.helper");
const { CACHE_TTL, DEFAULT_PAGE, DEFAULT_ELEMENT_LIMIT } = require("../../utils/constants");

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
    const filterConditions = [];
    const { category, categories, status, location, minDate, maxDate, page, limit } = requestQuery;
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
