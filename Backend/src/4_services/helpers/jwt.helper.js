const jwt = require('jsonwebtoken')

const signToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '24h' })
}

const verifyToken = (token) => {
  try {
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET)
    return decodedUserData
  }
  catch (err) {
    console.log('===> ERROR VERIFYING TOKEN: ', err)
    return null
  }
}

module.exports = {
  signToken,
  verifyToken
}