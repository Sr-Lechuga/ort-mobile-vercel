const { volunteerLogin } = require("../4_services/volunteer.service")

const postVolunteerLogin = (req, res) => {
  const { username, password } = res
  const volunteerData = volunteerLogin(username, password)

  if (!volunteerData) {
    res.status(400).json({ message: 'Credenciales incorrectas' })
    return
  }
}

module.exports = {
  postVolunteerLogin
}