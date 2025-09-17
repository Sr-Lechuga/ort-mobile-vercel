const { organizerLogin, organizerSignUp } = require("../4_services/organizer.service")
const { volunteerLogin, volunteerSignUp } = require("../4_services/volunteer.service")

// VOLUNTEERS
// Nota: Elegimos mantener toda la lógica entre voluntarios y organizadores por separado a pesar de que se repita código
// La intención de la decisión es que si a futuro algo varía entre volunteers y organizers, los cambios sean más sencillos de implementar
const postVolunteerLogin = async (req, res) => {
  const { username, password } = req.body
  try {
    const sesionToken = await volunteerLogin(username, password)

    if (!sesionToken) {
      res.status(400).json({ message: 'Credenciales incorrectas' })
      return
    }

    res.status(200).json({
      message: 'Inicio de sesión correcta',
      token: sesionToken
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Algo salió incorrectamente en inicio de sesión' })
  }
}

const postVolunteerSignUp = async (req, res) => {
  const { username, name, password, email } = req.body
  try {
    const newVolunteer = { username, name, password, email }
    await volunteerSignUp(newVolunteer)

    res.status(201).json({ message: 'Voluntario registrado correctamente. Puede iniciar sesión' })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Algo salió incorrectamente en registro de voluntario' })
  }
}
// END VOLUNTEERS


// ORGANIZERS
const postOrganizerLogin = async (req, res) => {
  const { username, password } = req.body
  try {
    const sesionToken = await organizerLogin(username, password)

    if (!sesionToken) {
      res.status(400).json({ message: 'Credenciales incorrectas' })
      return
    }

    res.status(200).json({
      message: 'Inicio de sesión correcta',
      token: sesionToken
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Algo salió incorrectamente en inicio de sesión' })
  }
}

const postOrganizerSignUp = async (req, res) => {
  const { username, name, password, email } = req.body
  try {
    const newOrganizer = { username, name, password, email }
    await organizerSignUp(newOrganizer)

    res.status(201).json({ message: 'Organizador registrado correctamente. Puede iniciar sesión' })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Algo salió incorrectamente en registro de organizador' })
  }
}
// END ORGANIZERS

module.exports = {
  postVolunteerLogin,
  postVolunteerSignUp,
  postOrganizerLogin,
  postOrganizerSignUp
}