const Volunteer = require('../models/volunteer.model')

const findVolunteerByUsername = async (username) => {
  const volunteer = await Volunteer.findOne({ username })
  return volunteer
}

const insertVolunteer = async (volunteerData) => {
  await Volunteer.create(volunteerData)
}

module.exports = {
  findVolunteerByUsername,
  insertVolunteer
}