const { USER_VOLUNTEER } = require("../utils/constants")
const { userLogin, userInsert } = require("./helpers/userAuth.helper")

const volunteerLogin = async (username, password) => {
  const token = await userLogin(username, password, USER_VOLUNTEER)
  return token
}

const volunteerSignUp = async (volunteerData) => {
  await userInsert(volunteerData, USER_VOLUNTEER)
}

module.exports = {
  volunteerLogin,
  volunteerSignUp
}