const {
  findActivityInstances,
  insertActivityInstances,
} = require("../5_repositories/activityInstance.repository");
const { createDate } = require("../utils/datesHandler");

const _bufferElementLimit = (limit) => {
  return limit <= 0 || limit > 20 ? 20 : limit;
};

const _getOffset = (page, limit) => {
  return (parseInt(page) - 1) * parseInt(limit);
};

const activityInstancesSelect = async (parameters) => {
  const filters = {};
  const {
    location,
    status,
    minDate,
    maxDate,
    page = 1,
    limit = 20,
  } = parameters;

  const elements = _bufferElementLimit(limit);
  const offset = _getOffset(page, elements);
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
