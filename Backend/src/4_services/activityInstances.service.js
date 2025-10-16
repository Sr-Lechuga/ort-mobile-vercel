const { insertActivityInstance, findActivityInstanceById, updateActivityInstance } = require("../5_repositories/activityInstance.repository");
const { insertInscription } = require("../5_repositories/inscription.repository");
const { updateActivityDate } = require("./helpers/activityUpdates.helper");

const activityInstanceInsert = async (activityInstanceData) => {
  const newActivityInstance = await insertActivityInstance(activityInstanceData);
  await updateActivityDate(activityInstanceData.activity);
  return newActivityInstance;
};

const activityInstanceSelectById = async (id) => {
  return await findActivityInstanceById(id);
};

const activityInstanceUpdate = async (id, activityInstanceData, activityId) => {
  const newData = await updateActivityInstance(id, activityInstanceData);
  await updateActivityDate(activityId);
  return newData;
};

const activityInstanceAddInscription = async (instanceId, volunteerId) => {
  const activityInstance = await findActivityInstanceById(instanceId);
  if (!activityInstance) throw new Error("ERROR 001, No se encontró la Instance");
  if (!activityInstance.inscriptionsOpen) throw new Error("ERROR 010, La Instancia no acepta más inscripciones");

  const inscriptionData = {
    volunteer: volunteerId,
    instance: instanceId,
  };
  const newInscription = await insertInscription(inscriptionData);
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
