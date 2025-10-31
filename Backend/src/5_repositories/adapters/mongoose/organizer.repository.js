const Organizer = require("./models/organizer.model");

const findOrganizerByUsername = async (username) => {
  const organizer = await Organizer.findOne({ username });
  return organizer;
};

const insertOrganizer = async (organizerData) => {
  await Organizer.create(organizerData);
};

module.exports = {
  findOrganizerByUsername,
  insertOrganizer,
};
