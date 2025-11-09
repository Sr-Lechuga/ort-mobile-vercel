const Comment = require("./models/comment.model");

const insertComment = async (commentData) => {
  const newComment = await Comment.create(commentData);
  return newComment;
};

const findCommentByVolunteerAndInstance = async (volunteerId, instanceId) => {
  return await Comment.findOne({ volunteer: volunteerId, instance: instanceId });
};

const countCommentsByVolunteer = async (volunteerId) => {
  return await Comment.countDocuments({ volunteer: volunteerId });
};

module.exports = {
  insertComment,
  findCommentByVolunteerAndInstance,
  countCommentsByVolunteer,
};
