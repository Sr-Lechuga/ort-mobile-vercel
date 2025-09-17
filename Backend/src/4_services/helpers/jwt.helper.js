const jwt = require('jsonwebtoken')

const signToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '24h' })
}

module.exports = {
  signToken
}