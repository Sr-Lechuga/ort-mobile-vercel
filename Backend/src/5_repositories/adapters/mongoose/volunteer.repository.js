const Volunteer = require("./models/volunteer.model");

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
  return await Volunteer.findById(id)
    .select(["username", "badgesEarned", "registrationDate"])
    .populate({
      path: "badgesEarned.badgeId",
      model: "Badge",
      select: ["badgeId", "title", "description", "imageUrl", "type", "level"],
    });
};

module.exports = {
  findVolunteerByUsername,
  findVolunteerById,
  insertVolunteer,
  updateVolunteer,
  findVolunteerByIdWithBadges,
};
