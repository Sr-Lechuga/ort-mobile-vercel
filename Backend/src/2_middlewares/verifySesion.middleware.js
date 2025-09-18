const { verifyToken } = require("../4_services/helpers/jwt.helper")

const verifySesion = async (req, res, next) => {
  const token = req.headers['authorization']
  const decodedUserData = verifyToken(token)

  if (!token || !decodedUserData) {
    res.send(401).json({ message: 'Sesión expirada o inválida. Por favor inicie sesión nuevamente' })
    return
  }

  req.session = decodedUserData
  next()
}

module.exports = verifySesion