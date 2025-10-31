const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../../utils/constants");

/**
 * Encripta una contraseña usando bcrypt con salt rounds configurados
 * @param {string} password - Contraseña en texto plano a encriptar
 * @returns {Promise<string>} - Contraseña encriptada
 */
const encryptPassword = async (password) => {
  const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : SALT_ROUNDS;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/**
 * Compara una contraseña en texto plano con una contraseña encriptada
 * @param {string} password - Contraseña en texto plano
 * @param {string} hashedPassword - Contraseña encriptada almacenada
 * @returns {Promise<boolean>} - true si las contraseñas coinciden, false en caso contrario
 */
const comparePassword = async (password, hashedPassword) => {
  const matchResult = await bcrypt.compare(password, hashedPassword);
  return matchResult;
};

module.exports = {
  encryptPassword,
  comparePassword,
};
