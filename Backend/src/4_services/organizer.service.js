const { USER_ORGANIZER } = require("../utils/constants")
const { userLogin, userInsert } = require("./helpers/userAuth.helper")

const organizerLogin = async (username, password) => {
  const token = await userLogin(username, password, USER_ORGANIZER)
  return token
}

const organizerSignUp = async (volunteerData) => {
  await userInsert(volunteerData, USER_ORGANIZER)
}

module.exports = {
  organizerLogin,
  organizerSignUp
}