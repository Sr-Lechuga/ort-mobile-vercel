const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION } = require("../../utils/constants");

/**
 * Genera un token JWT firmado con los datos del usuario
 * El token incluye el tipo de usuario y los datos básicos del usuario
 * @param {Object} userData - Datos del usuario (id, username, name)
 * @param {string} userType - Tipo de usuario (volunteer, organizer)
 * @returns {string} - Token JWT firmado con expiración de 24 horas
 */
const signToken = (userData, userType) => {
  const payload = { userType, ...userData };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || JWT_EXPIRATION });
};

/**
 * Verifica y decodifica un token JWT
 * Valida la firma del token y extrae los datos del usuario
 * @param {string} token - Token JWT a verificar
 * @returns {Object|null} - Datos decodificados del usuario o null si el token es inválido
 */
const verifyToken = (token) => {
  try {
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
    return decodedUserData;
  } catch (err) {
    console.log("===> ERROR VERIFYING TOKEN: ", err);
    return null;
  }
};

module.exports = {
  signToken,
  verifyToken,
};
