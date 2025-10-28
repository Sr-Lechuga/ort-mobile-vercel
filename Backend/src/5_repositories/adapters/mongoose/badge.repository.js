const Badge = require("./models/badge.model");

const insertBadge = async (badgeData) => {
  const newBadge = await Badge.create(badgeData);
  return newBadge;
};

const findBadgeById = async (badgeId) => {
  return await Badge.findOne({ badgeId });
};

const findActiveBadges = async () => {
  return await Badge.find({ active: true }).sort({ priority: -1, level: 1 });
};

const findBadgesByType = async (type) => {
  return await Badge.find({ type, active: true }).sort({ priority: -1, level: 1 });
};

const updateBadge = async (badgeId, badgeData) => {
  return await Badge.findOneAndUpdate({ badgeId }, badgeData, { new: true });
};

module.exports = {
  findBadgeById,
  findActiveBadges,
  findBadgesByType,
  insertBadge,
  updateBadge,
};
