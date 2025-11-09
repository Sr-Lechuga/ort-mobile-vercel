const mongoose = require("mongoose");
const OrganizerComment = require("./models/organizerComment.model");

const insertOrganizerComment = async (commentData) => {
  return await OrganizerComment.create(commentData);
};

const findOrganizerCommentByVolunteerAndOrganizer = async (volunteerId, organizerId) => {
  return await OrganizerComment.findOne({ volunteer: volunteerId, organizer: organizerId });
};

const countOrganizerCommentsByVolunteer = async (volunteerId) => {
  return await OrganizerComment.countDocuments({ volunteer: volunteerId });
};

const sanitizeOrganizerComments = (comments) =>
  comments.map((comment) => ({
    ...comment,
    volunteer: comment.anonymous ? null : comment.volunteer,
  }));

const findOrganizerCommentsByOrganizer = async (organizerId) => {
  if (!mongoose.Types.ObjectId.isValid(organizerId)) {
    throw new Error("ERROR 022, Identificador de centro inválido");
  }

  const comments = await OrganizerComment.find({ organizer: organizerId }).sort({ createdAt: -1 }).lean();
  return sanitizeOrganizerComments(comments);
};

const getOrganizerCommentsStats = async (organizerId) => {
  if (!mongoose.Types.ObjectId.isValid(organizerId)) {
    throw new Error("ERROR 022, Identificador de centro inválido");
  }

  const [stats] = await OrganizerComment.aggregate([
    {
      $match: { organizer: new mongoose.Types.ObjectId(organizerId) },
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
  insertOrganizerComment,
  findOrganizerCommentByVolunteerAndOrganizer,
  countOrganizerCommentsByVolunteer,
  findOrganizerCommentsByOrganizer,
  getOrganizerCommentsStats,
};
