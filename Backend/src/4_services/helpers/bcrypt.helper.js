const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword
}

const comparePassword = async (password, hashedPassword) => {
  const matchResult = await bcrypt.compare(password, hashedPassword)
  return matchResult
}

module.exports = {
  encryptPassword,
  comparePassword
}