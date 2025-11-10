const { findInscriptionById, deleteInscriptionById, findAssistedInstanceIdsByVolunteer } = require("../../5_repositories/adapters/mongoose/inscription.repository");
const { findActivityInstancesWithActivityByIds } = require("../../5_repositories/adapters/mongoose/activityInstance.repository");
const { findVolunteerByIdWithBadges } = require("../../5_repositories/adapters/mongoose/volunteer.repository");
const { USER_VOLUNTEER, CACHE_TTL } = require("../../utils/constants");
const cacheService = require("../cache/cache.service");
const { generateVolunteerPublicProfileCacheKey } = require("../helpers/cacheKey.helper");
const { userLogin, userInsert } = require("../helpers/userAuth.helper");

const volunteerLogin = async (username, password) => {
  const token = await userLogin(username, password, USER_VOLUNTEER);
  return token;
};

const volunteerSignUp = async (volunteerData) => {
  await userInsert(volunteerData, USER_VOLUNTEER);
};

const deleteInscriptionService = async (volunteerId, inscriptionId) => {
  const inscription = await findInscriptionById(inscriptionId);

  if (!inscription) throw new Error("ERROR 001, No se encontró la Inscripción");
  if (inscription.volunteer != volunteerId) throw new Error("ERROR 011, La inscripción no te pertenece");

  await deleteInscriptionById(inscriptionId);
  await cacheService.delete(generateVolunteerPublicProfileCacheKey(String(volunteerId)));
};

const getVolunteerPublicProfile = async (volunteerId) => {
  const cacheKey = generateVolunteerPublicProfileCacheKey(volunteerId);
  const cachedProfile = await cacheService.get(cacheKey);

  if (cachedProfile) {
    return cachedProfile;
  }

  const volunteerDocument = await findVolunteerByIdWithBadges(volunteerId);

  if (!volunteerDocument) {
    return null;
  }

  const volunteer = volunteerDocument.toObject ? volunteerDocument.toObject() : volunteerDocument;
  const assistedInstanceIds = await findAssistedInstanceIdsByVolunteer(volunteerId);
  let activities = [];

  if (assistedInstanceIds?.length) {
    const activityInstances = await findActivityInstancesWithActivityByIds(assistedInstanceIds);
    activities = activityInstances.map((instance) => {
      const instanceData = instance?.toObject ? instance.toObject() : instance;
      const activity = instanceData.activity;
      return {
        instanceId: instanceData._id,
        activityId: activity?._id || null,
        title: activity?.title || null,
        categories: activity?.categories || [],
        date: instanceData.date,
        location: activity?.location || null,
      };
    });
  }

  const badges = (volunteer.badgesEarned || []).map((badgeEntry) => {
    const populatedBadge = badgeEntry.badgeId;
    if (populatedBadge && typeof populatedBadge === "object" && "badgeId" in populatedBadge) {
      return {
        badgeId: populatedBadge.badgeId,
        title: populatedBadge.title,
        description: populatedBadge.description,
        imageUrl: populatedBadge.imageUrl,
        obtainedAt: badgeEntry.obtainedAt,
        type: populatedBadge.type,
        level: populatedBadge.level,
      };
    }
    return {
      badgeId: badgeEntry.badgeId,
      obtainedAt: badgeEntry.obtainedAt,
    };
  });

  const profile = {
    volunteerId: volunteer._id,
    username: volunteer.username,
    badges,
    activities,
    registrationDate: volunteer.registrationDate,
    totalActivities: activities.length,
  };

  const ttlEnv = parseInt(process.env.CACHE_TTL_VOLUNTEER_PUBLIC_PROFILE, 10);
  const ttl = Number.isNaN(ttlEnv) ? CACHE_TTL.USER_DATA : ttlEnv;
  await cacheService.set(cacheKey, profile, ttl);

  return profile;
};

module.exports = {
  volunteerLogin,
  volunteerSignUp,
  deleteInscriptionService,
  getVolunteerPublicProfile,
};
