const { USER_ORGANIZER, CACHE_TTL } = require("../../utils/constants");
const cacheService = require("../cache/cache.service");
const { generateOrganizerPublicProfileCacheKey } = require("../helpers/cacheKey.helper");
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
  const cacheKey = generateOrganizerPublicProfileCacheKey(organizerId);
  const cachedProfile = await cacheService.get(cacheKey);

  if (cachedProfile) {
    return cachedProfile;
  }

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

  const profile = {
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

  const ttlEnv = parseInt(process.env.CACHE_TTL_ORGANIZER_PUBLIC_PROFILE, 10);
  const ttl = Number.isNaN(ttlEnv) ? CACHE_TTL.USER_DATA : ttlEnv;
  await cacheService.set(cacheKey, profile, ttl);

  return profile;
};

module.exports = {
  organizerLogin,
  organizerSignUp,
  getOrganizerPublicProfile,
};
