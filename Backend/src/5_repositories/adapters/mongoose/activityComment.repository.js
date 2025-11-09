const mongoose = require("mongoose");
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

const sanitizeActivityComments = (comments) =>
  comments.map((comment) => ({
    ...comment,
    volunteer: comment.anonymous ? null : comment.volunteer,
  }));

const findActivityCommentsByActivity = async (activityId) => {
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    throw new Error("ERROR 021, Identificador de actividad inválido");
  }

  const comments = await ActivityComment.find({ activity: activityId }).sort({ createdAt: -1 }).lean();
  return sanitizeActivityComments(comments);
};

const getActivityCommentsStats = async (activityId) => {
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    throw new Error("ERROR 021, Identificador de actividad inválido");
  }

  const [stats] = await ActivityComment.aggregate([
    {
      $match: { activity: new mongoose.Types.ObjectId(activityId) },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalComments: { $sum: 1 },
      },
    },
  ]);

  if (!stats) {
    return { averageRating: 0, totalComments: 0 };
  }

  return {
    averageRating: stats.averageRating,
    totalComments: stats.totalComments,
  };
};

module.exports = {
  insertActivityComment,
  findActivityCommentByVolunteerAndInstance,
  countActivityCommentsByVolunteer,
  findActivityCommentsByActivity,
  getActivityCommentsStats,
};
