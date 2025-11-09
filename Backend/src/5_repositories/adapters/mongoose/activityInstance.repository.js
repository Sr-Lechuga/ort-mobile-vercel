const ActivityInstance = require("./models/activityInstance.model");

const findActivityInstances = async (filters, pagination) => {
  const { skip, limit } = pagination;
  const results = await ActivityInstance.find(filters).skip(skip).limit(limit);
  return results;
};

const findActivityInstanceById = async (id) => {
  return await ActivityInstance.findById(id);
};

const findActivityInstanceByIdsAndOwner = async (ids, ownerId) => {
  if (!ids || !ids.length) return null;
  return await ActivityInstance.findOne({ _id: { $in: ids }, owner: ownerId });
};

const insertActivityInstance = async (activityInstanceData) => {
  const newActivityInstance = await ActivityInstance.create(activityInstanceData);
  return newActivityInstance;
};

const updateActivityInstance = async (id, activityInstanceData) => {
  const newData = await ActivityInstance.findByIdAndUpdate(id, activityInstanceData);
  return newData;
};

module.exports = {
  findActivityInstances,
  findActivityInstanceById,
  insertActivityInstance,
  updateActivityInstance,
  findActivityInstanceByIdsAndOwner,
};
