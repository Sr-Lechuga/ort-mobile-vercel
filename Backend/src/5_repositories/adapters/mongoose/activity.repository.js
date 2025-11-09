const Activity = require("./models/activity.model");
const { ACTIVITY_STATUS } = require("../../../utils/constants");

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

const findActiveActivitiesByOwner = async (ownerId) => {
  return await Activity.find({ owner: ownerId, status: ACTIVITY_STATUS[1] }).select(["title", "categories", "date", "location", "status"]);
};

module.exports = {
  findActivityById,
  findActivities,
  insertActivity,
  updateActivity,
  findActiveActivitiesByOwner,
};
