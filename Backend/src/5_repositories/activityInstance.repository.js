const ActivityInstance = require("../models/activityInstance.model");

const findActivityInstanceById = async (id) => {
  return await ActivityInstance.findById(id)
}

const insertActivityInstance = async (activityInstanceData) => {
  const newActivityInstance = await ActivityInstance.create(activityInstanceData);
  return newActivityInstance
};

const findActivityInstances = async (filters, pagination) => {
  const { skip, limit } = pagination;
  const results = await ActivityInstance.find(filters).skip(skip).limit(limit);
  return results;
};

module.exports = {
  insertActivityInstance,
  findActivityInstances,
  findActivityInstanceById
};
