const { findVolunteerByCredentials } = require("../5_repositories/volunteer.repository")

const volunteerLogin = (username, password) => {
  const volunteer = findVolunteerByCredentials(username, password)

  if (!volunteer) return null


}

module.exports = {
  volunteerLogin
}