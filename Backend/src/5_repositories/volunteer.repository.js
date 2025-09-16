const volunteers = require('../db/volunteers')

const findVolunteerByCredentials = (username, password) => {
  const volunteer = volunteers.find(u => u.username === username && u.password === password)
  return volunteer
}

module.exports = {
  findVolunteerByCredentials
}