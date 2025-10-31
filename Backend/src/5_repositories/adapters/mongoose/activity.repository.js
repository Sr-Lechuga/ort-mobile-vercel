const Activity = require("./models/activity.model");

const findActivityById = async (id) => {
  return await Activity.findById(id).populate("instances");
};

const insertActivity = async (activityData) => {
  const newActivity = await Activity.create(activityData);
  return newActivity;
};

const updateActivity = async (id, activityData) => {
  const newData = await Activity.findByIdAndUpdate(id, activityData);
  return newData;
};

const findActivities = async (filters, pagination) => {
  const { skip, limit } = pagination;
  const results = await Activity.find(filters).skip(skip).limit(limit).populate("instances");
  return results;
};

module.exports = {
  findActivityById,
  findActivities,
  insertActivity,
  updateActivity,
};
