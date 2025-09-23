const ActivityInstance = require("../models/activityInstance.model");

const findActivityInstances = async (filters, pagination) => {
  const { skip, limit } = pagination;
  const results = await ActivityInstance.find(filters).skip(skip).limit(limit);
  return results;
};

module.exports = {
  findActivityInstances,
};
