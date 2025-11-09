const ActivityComment = require("./models/activityComment.model");

const insertActivityComment = async (commentData) => {
  const newComment = await ActivityComment.create(commentData);
  return newComment;
};

const findActivityCommentByVolunteerAndInstance = async (volunteerId, instanceId) => {
  return await ActivityComment.findOne({ volunteer: volunteerId, instance: instanceId });
};

const countActivityCommentsByVolunteer = async (volunteerId) => {
  return await ActivityComment.countDocuments({ volunteer: volunteerId });
};

module.exports = {
  insertActivityComment,
  findActivityCommentByVolunteerAndInstance,
  countActivityCommentsByVolunteer,
};

