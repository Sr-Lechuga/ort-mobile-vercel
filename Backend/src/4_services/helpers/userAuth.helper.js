const { findOrganizerByUsername, insertOrganizer } = require("../../5_repositories/adapters/mongoose/organizer.repository");
const { findVolunteerByUsername, insertVolunteer } = require("../../5_repositories/adapters/mongoose/volunteer.repository");
const { USER_VOLUNTEER } = require("../../utils/constants");
const { comparePassword, encryptPassword } = require("./bcrypt.helper");
const { signToken } = require("./jwt.helper");

/**
 * Autentica un usuario verificando credenciales y generando un token JWT
 * Busca el usuario según su tipo y valida la contraseña
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña en texto plano
 * @param {string} userType - Tipo de usuario (volunteer u organizer)
 * @returns {Promise<string|null>} - Token JWT si las credenciales son válidas, null en caso contrario
 */
const userLogin = async (username, password, userType) => {
  const user = userType === USER_VOLUNTEER ? await findVolunteerByUsername(username) : await findOrganizerByUsername(username);
  if (!user) return null;

  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) return null;

  const userData = { id: user._id, username: user.username, name: user.name };
  const token = signToken(userData, userType);
  return token;
};

/**
 * Inserta un nuevo usuario encriptando su contraseña
 * Crea el usuario según su tipo (volunteer u organizer)
 * @param {Object} userData - Datos del usuario incluyendo contraseña en texto plano
 * @param {string} userType - Tipo de usuario (volunteer u organizer)
 * @returns {Promise<void>} - No retorna valor
 */
const userInsert = async (userData, userType) => {
  const hashedPassword = await encryptPassword(userData.password);
  const newUser = { ...userData, password: hashedPassword };
  if (userType === USER_VOLUNTEER) await insertVolunteer(newUser);
  else await insertOrganizer(newUser);
};

module.exports = {
  userLogin,
  userInsert,
};
