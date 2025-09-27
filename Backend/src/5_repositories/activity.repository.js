const Activity = require("../models/activity.model");

const findActivityById = async (id) => {
  return await Activity.findById(id)
}

const insertActivity = async (activityData) => {
  await Activity.create(activityData);
};

const findActivities = async (filters, pagination) => {
  const { skip, limit } = pagination;
  const results = await Activity.find(filters).skip(skip).limit(limit);
  return results;
};

module.exports = {
  findActivityById,
  findActivities,
  insertActivity,
};
