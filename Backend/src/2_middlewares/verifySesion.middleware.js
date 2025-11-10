const { verifyToken } = require("../4_services/helpers/jwt.helper");

/**
 * Middleware que valida la sesión del usuario autenticando el token JWT.
 * Si el token es válido, adjunta la información decodificada al objeto `req.session`.
 * En caso contrario, responde con un error 401 indicando que la sesión es inválida o expiró.
 * @param {import("express").Request} req - Petición entrante
 * @param {import("express").Response} res - Respuesta HTTP
 * @param {import("express").NextFunction} next - Función para continuar con la cadena de middlewares
 */
const verifySesion = async (req, res, next) => {
  // In case the token comes with the "Bearer " prefix, we need to remove it
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  const decodedUserData = verifyToken(token);

  if (!token || !decodedUserData) {
    res.status(401).json({
      message: "Sesión expirada o inválida. Por favor inicie sesión nuevamente",
    });
    return;
  }

  req.session = decodedUserData;
  next();
};

module.exports = verifySesion;
