const {
  //findActivityInstances,
  insertActivityInstance,
  findActivityInstanceById } = require("../5_repositories/activityInstance.repository");
const { insertInscription } = require("../5_repositories/inscription.repository");

/*
const { createDate } = require("../utils/datesHandler");
const {
  bufferOffset,
  bufferElementLimit,
  geoLocationRadiusFilter,
} = require("./helpers/requestParameters.helper");
*/

const activityInstanceInsert = async (activityInstanceData) => {
  const newActivityInstance = await insertActivityInstance(activityInstanceData);
  return newActivityInstance
};

const activityInstanceAddInscription = async (instanceId, volunteerId) => {
  const activityInstance = await findActivityInstanceById(instanceId)
  if (!activityInstance) throw new Error("ERROR 001, Instance not found")

  const inscriptionData = {
    volunteer: volunteerId,
    instance: instanceId
  }
  const newInscription = await insertInscription(inscriptionData)
  return newInscription
}

/*
    volunteer: { type: mongoose.Schema.Types.ObjectId, required: true },
    accepted: { type: boolean, required: true, default: false },
    date: { type: Date, required: true, default: Date.now },
    assisted: { type: boolean, required: true, default: false }
*/

module.exports = {
  //activityInstancesSelect,
  activityInstanceInsert,
  activityInstanceAddInscription
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
