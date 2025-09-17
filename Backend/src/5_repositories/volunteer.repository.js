const volunteers = require('../db/volunteers')

const findVolunteerByUsername = async (username) => {
  const volunteer = volunteers.find(u => u.username === username)
  return volunteer
}

const insertVolunteer = async (volunteerData) => {
  const newVolunteer = { ...volunteerData }
  volunteers.push(newVolunteer)
  console.log(volunteers)
}

module.exports = {
  findVolunteerByUsername,
  insertVolunteer
}