const ActivityInstance = require("../models/activityInstance.model");

const insertActivityInstances = async (activityInstanceData) => {
  await ActivityInstance.create(activityInstanceData);
};

const findActivityInstances = async (filters, pagination) => {
  const { skip, limit } = pagination;
  const results = await ActivityInstance.find(filters).skip(skip).limit(limit);
  return results;
};

module.exports = {
  insertActivityInstances,
  findActivityInstances,
};
