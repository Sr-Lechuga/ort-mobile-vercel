const Volunteer = require("./models/volunteer.model");
const Badge = require("./models/badge.model");

const findVolunteerByUsername = async (username) => {
  const volunteer = await Volunteer.findOne({ username });
  return volunteer;
};

const findVolunteerById = async (id) => {
  return await Volunteer.findById(id);
};

const insertVolunteer = async (volunteerData) => {
  const newVolunteer = await Volunteer.create(volunteerData);
  return newVolunteer;
};

const updateVolunteer = async (id, volunteerData) => {
  return await Volunteer.findByIdAndUpdate(id, volunteerData, { new: true });
};

const findVolunteerByIdWithBadges = async (id) => {
  const volunteer = await Volunteer.findById(id).select(["username", "badgesEarned", "registrationDate"]).lean();

  if (!volunteer) {
    return null;
  }

  const badgeIds = (volunteer.badgesEarned || []).map((badgeEntry) => badgeEntry.badgeId).filter(Boolean);

  if (!badgeIds.length) {
    return volunteer;
  }

  const badges = await Badge.find({ badgeId: { $in: badgeIds } })
    .select(["badgeId", "title", "description", "imageUrl", "type", "level"])
    .lean();

  const badgesMap = new Map(badges.map((badge) => [badge.badgeId, badge]));

  volunteer.badgesEarned = (volunteer.badgesEarned || []).map((badgeEntry) => {
    const badgeDetails = badgesMap.get(badgeEntry.badgeId);
    if (!badgeDetails) {
      return badgeEntry;
    }
    return {
      ...badgeEntry,
      badgeId: badgeDetails,
    };
  });

  return volunteer;
};

module.exports = {
  findVolunteerByUsername,
  findVolunteerById,
  insertVolunteer,
  updateVolunteer,
  findVolunteerByIdWithBadges,
};
