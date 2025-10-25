const { insertActivityInstance, findActivityInstanceById, updateActivityInstance } = require("../../5_repositories/adapters/mongoose/activityInstance.repository");
const { insertInscription } = require("../../5_repositories/adapters/mongoose/inscription.repository");
const { updateActivityDate } = require("../helpers/activityUpdates.helper");
const cacheService = require("../cache/cache.service");
const { generateActivityInstanceCacheKey, generateCachePattern } = require("../helpers/cacheKey.helper");
const { CACHE_TTL } = require("../../utils/constants");

const activityInstanceInsert = async (activityInstanceData) => {
  const newActivityInstance = await insertActivityInstance(activityInstanceData);
  await updateActivityDate(activityInstanceData.activity);

  // Invalidar cache de la actividad padre (ya que ahora tiene una nueva instancia)
  const activityCacheKey = `activity:${activityInstanceData.activity}`;
  const activitiesPattern = generateCachePattern("activities");

  await cacheService.deleteMultiple([activityCacheKey, activitiesPattern]);

  return newActivityInstance;
};

const activityInstanceSelectById = async (id) => {
  const cacheKey = generateActivityInstanceCacheKey(id);
  let activityInstance = await cacheService.get(cacheKey);

  if (!activityInstance) {
    // Si no está en cache, ejecutar consulta a la base de datos
    activityInstance = await findActivityInstanceById(id);

    if (activityInstance) {
      // Guardar en cache por el TTL configurado desde .env
      await cacheService.set(cacheKey, activityInstance, process.env.CACHE_TTL_ACTIVITY_INSTANCE || CACHE_TTL.ACTIVITY_INSTANCE);
    }
  }

  return activityInstance;
};

const activityInstanceUpdate = async (id, activityInstanceData, activityId) => {
  const newData = await updateActivityInstance(id, activityInstanceData);
  await updateActivityDate(activityId);

  // Invalidar cache específico de la instancia actualizada
  const instanceCacheKey = generateActivityInstanceCacheKey(id);
  const activityCacheKey = `activity:${activityId}`;
  const activitiesPattern = generateCachePattern("activities");

  await cacheService.deleteMultiple([instanceCacheKey, activityCacheKey, activitiesPattern]);

  return newData;
};

const activityInstanceAddInscription = async (instanceId, volunteerId) => {
  const activityInstance = await activityInstanceSelectById(instanceId);
  if (!activityInstance) throw new Error("ERROR 001, No se encontró la Instance");
  if (!activityInstance.inscriptionsOpen) throw new Error("ERROR 010, La Instancia no acepta más inscripciones");

  const inscriptionData = {
    volunteer: volunteerId,
    instance: instanceId,
  };
  const newInscription = await insertInscription(inscriptionData);

  // Invalidar cache de la instancia ya que ahora tiene una nueva inscripción
  const instanceCacheKey = generateActivityInstanceCacheKey(instanceId);
  await cacheService.delete(instanceCacheKey);

  return newInscription;
};

module.exports = {
  activityInstanceInsert,
  activityInstanceUpdate,
  activityInstanceAddInscription,
  activityInstanceSelectById,
};

/*
const activityInstancesSelect = async (parameters) => {
  const filters = {};
  const {
    lat,
    lng,
    radius, //in meters
    location,
    status,
    minDate,
    maxDate,
    page = 1,
    limit = 20,
  } = parameters;

  const geoLocationFilter = geoLocationRadiusFilter(lat, lng, radius);
  const elements = bufferElementLimit(limit);
  const offset = bufferOffset(page, elements);
  const pagination = { skip: offset, limit: elements };

  if (status) filters.status = status;
  if (location) filters.location = new RegExp(location, "i"); // 'i' = Case insensitive
  if (minDate) {
    const isValid = createDate(minDate);
    if (isValid) filters.startDate = { $gte: isValid };
  }
  if (maxDate) {
    const isValid = createDate(maxDate);
    if (isValid) filters.startDate = { ...(filters.date || {}), $lte: isValid };
  }
  if (geoLocationFilter) filters.locationCoordinates = geoLocationFilter;

  const activities = await findActivityInstances(filters, pagination);
  return activities;
};
*/
