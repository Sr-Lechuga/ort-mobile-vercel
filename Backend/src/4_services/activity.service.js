const {
  findActivities,
  insertActivity,
  findActivityById,
} = require("../5_repositories/activity.repository");
const { createDate } = require("../utils/datesHandler");
const {
  bufferElementLimit,
  bufferOffset,
} = require("./helpers/requestParameters.helper");

const activitySelectById = async (id) => {
  return await findActivityById(id)
}

const activitiesSelect = async (requestQuery) => {
  const filters = {};
  const {
    category,
    location,
    minDate,
    maxDate,
    page = 1,
    limit = 10,
  } = requestQuery;

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
  const activities = await findActivities(filters, pagination);
  return activities;
};

const activityInsert = async (activityData) => {
  await insertActivity(activityData);
};

module.exports = {
  activitySelectById,
  activitiesSelect,
  activityInsert,
};
