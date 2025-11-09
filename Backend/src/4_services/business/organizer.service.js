const { USER_ORGANIZER } = require("../../utils/constants");
const { findActiveActivitiesByOwner } = require("../../5_repositories/adapters/mongoose/activity.repository");
const { findOrganizerById } = require("../../5_repositories/adapters/mongoose/organizer.repository");
const { userLogin, userInsert } = require("../helpers/userAuth.helper");

const organizerLogin = async (username, password) => {
  const token = await userLogin(username, password, USER_ORGANIZER);
  return token;
};

const organizerSignUp = async (volunteerData) => {
  await userInsert(volunteerData, USER_ORGANIZER);
};

const getOrganizerPublicProfile = async (organizerId) => {
  const organizerDocument = await findOrganizerById(organizerId);

  if (!organizerDocument) {
    return null;
  }

  const organizer = organizerDocument.toObject ? organizerDocument.toObject() : organizerDocument;
  const activeActivities = await findActiveActivitiesByOwner(organizerId);

  const focusAreas = [
    ...new Set(
      activeActivities.reduce((acc, activity) => {
        const activityData = activity?.toObject ? activity.toObject() : activity;
        if (activityData?.categories?.length) {
          acc.push(...activityData.categories);
        }
        return acc;
      }, [])
    ),
  ];

  return {
    organizerId: organizer._id,
    name: organizer.name,
    username: organizer.username,
    contact: {
      email: organizer.contactEmail || organizer.email,
      telephone: organizer.telephone || null,
      social: organizer.social,
    },
    location: organizer.location,
    focusAreas,
    activeActivities: activeActivities.map((activity) => {
      const activityData = activity?.toObject ? activity.toObject() : activity;
      return {
        activityId: activityData._id,
        title: activityData.title,
        categories: activityData.categories,
        date: activityData.date,
        location: activityData.location,
      };
    }),
    updatedAt: organizer.updatedAt,
  };
};

module.exports = {
  organizerLogin,
  organizerSignUp,
  getOrganizerPublicProfile,
};
