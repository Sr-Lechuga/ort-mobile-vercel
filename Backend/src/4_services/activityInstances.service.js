const {
  findActivityInstances,
  insertActivityInstances,
} = require("../5_repositories/activityInstance.repository");
const { createDate } = require("../utils/datesHandler");
const {
  bufferOffset,
  bufferElementLimit,
  geoLocationRadiusFilter,
} = require("./helpers/requestParameters.helper");

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

const activityInstancesInsert = async (activityInstanceData) => {
  await insertActivityInstances(activityInstanceData);
};

module.exports = {
  activityInstancesSelect,
  activityInstancesInsert,
};
