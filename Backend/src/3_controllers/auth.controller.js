const { volunteerLogin, volunteerSignUp } = require("../4_services/business/volunteer.service");
const { organizerLogin, organizerSignUp } = require("../4_services/business/organizer.service");

// VOLUNTEERS
// Nota: Elegimos mantener toda la lógica entre voluntarios y organizadores por separado a pesar de que se repita código
// La intención de la decisión es que si a futuro algo varía entre volunteers y organizers, los cambios sean más sencillos de implementar
const postVolunteerLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const sesionToken = await volunteerLogin(username, password);

    if (!sesionToken) {
      res.status(400).json({ message: "Credenciales incorrectas" });
      return;
    }

    res.status(200).json({
      message: "Inicio de sesión correcta",
      token: sesionToken,
      username
    });
  } catch (err) {
    err.placeOfError = "Inicio de sesión de Volunteer";
    next(err);
  }
};

const postVolunteerSignUp = async (req, res, next) => {
  const { username, email, password, name, lastname, age, genre } = req.body;
  try {
    // Se hace de esta forma y no directamente del req.body para que quede mas claro que atributos van al nuevo voluntario
    const newVolunteer = {
      username,
      email,
      password,
      name,
      lastname,
      age,
      genre,
      registrationDate: Date.now(),
    };
    await volunteerSignUp(newVolunteer);

    res.status(201).json({
      message: "Voluntario registrado correctamente. Puede iniciar sesión",
    });
  } catch (err) {
    err.placeOfError = "Registro [SignUp] de Volunteer";
    next(err);
  }
};
// END VOLUNTEERS

// ORGANIZERS
const postOrganizerLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const sesionToken = await organizerLogin(username, password);

    if (!sesionToken) {
      res.status(400).json({ message: "Credenciales incorrectas" });
      return;
    }

    res.status(200).json({
      message: "Inicio de sesión correcta",
      token: sesionToken,
      username
    });
  } catch (err) {
    err.placeOfError = "Inicio de sesión de Organizer";
    next(err);
  }
};

const postOrganizerSignUp = async (req, res, next) => {
  const { username, email, contactEmail, password, name, telephone, social, location } = req.body;
  try {
    const newOrganizer = {
      username,
      email,
      contactEmail,
      password,
      name,
      telephone,
      social,
      location,
    };
    await organizerSignUp(newOrganizer);

    res.status(201).json({
      message: "Organizador registrado correctamente. Puede iniciar sesión",
    });
  } catch (err) {
    err.placeOfError = "Registro [SignUp] de Organizer";
    next(err);
  }
};
// END ORGANIZERS

module.exports = {
  postVolunteerLogin,
  postVolunteerSignUp,
  postOrganizerLogin,
  postOrganizerSignUp,
};
