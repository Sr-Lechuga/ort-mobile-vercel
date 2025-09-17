const organizers = require('../db/organizers')

const findOrganizerByUsername = async (username) => {
  const organizer = organizers.find(u => u.username === username)
  return organizer
}

const insertOrganizer = async (organizerData) => {
  const newOrganizer = { ...organizerData }
  organizers.push(newOrganizer)
  console.log(organizers)
}

module.exports = {
  findOrganizerByUsername,
  insertOrganizer
}