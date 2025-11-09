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

module.exports = {
  insertOrganizerComment,
  findOrganizerCommentByVolunteerAndOrganizer,
  countOrganizerCommentsByVolunteer,
};
