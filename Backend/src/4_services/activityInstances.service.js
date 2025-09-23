const {
  findActivityInstances,
} = require("../5_repositories/activityInstance.repository");
const { createDate } = require("../utils/datesHandler");

const _bufferElementLimit = (limit) => {
  return limit <= 0 || limit > 20 ? 20 : limit;
};

const _getOffset = (page, limit) => {
  return (parseInt(page) - 1) * parseInt(limit);
};

const activityInstancesSelect = async (requestQuery) => {
  const filters = {};
  const {
    //category,
    //location,
    minDate,
    maxDate,
    //page = requestQuery.page,
    page = 1,
    //limit = requestQuery.limit,
    limit = 10,
  } = requestQuery;

  const elements = _bufferElementLimit(limit);
  const offset = _getOffset(page, elements);
  const pagination = { skip: offset, limit: elements };

  //if (category) filters.category = category;
  //if (location) filters.location = new RegExp(location, "i"); // 'i' = Case insensitive
  if (minDate) {
    const isValid = createDate(minDate);
    if (isValid) filters.date = { $gte: isValid };
  }
  if (maxDate) {
    const isValid = createDate(maxDate);
    if (isValid) filters.date = { ...(filters.date || {}), $lte: isValid };
  }

  const activities = await findActivityInstances(filters, pagination);
  return activities;
};

const activityInstancesInsert = async (newActivity) => {};

module.exports = {
  activityInstancesSelect,
  activityInstancesInsert,
};
