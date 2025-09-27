const { findOrganizerByUsername, insertOrganizer } = require("../../5_repositories/organizer.repository")
const { findVolunteerByUsername, insertVolunteer } = require("../../5_repositories/volunteer.repository")
const { USER_VOLUNTEER } = require("../../utils/constants")
const { comparePassword, encryptPassword } = require("./bcrypt.helper")
const { signToken } = require("./jwt.helper")

const userLogin = async (username, password, userType) => {
  const user = userType === USER_VOLUNTEER
    ? await findVolunteerByUsername(username)
    : await findOrganizerByUsername(username)
  if (!user) return null

  const isCorrectPassword = await comparePassword(password, user.password)
  if (!isCorrectPassword) return null

  const userData = { id: user._id, username: user.username, name: user.name }
  const token = signToken(userData, userType)
  return token
}

const userInsert = async (userData, userType) => {
  const hashedPassword = await encryptPassword(userData.password)
  const newUser = { ...userData, password: hashedPassword }
  if (userType === USER_VOLUNTEER) await insertVolunteer(newUser)
  else await insertOrganizer(newUser)
}

module.exports = {
  userLogin,
  userInsert
}