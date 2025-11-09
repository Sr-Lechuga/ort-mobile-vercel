// requiredAccessLevel is an array of access levels that are required to access the route
// Require to have already verified the session
/**
 * Middleware que restringe el acceso según el tipo de usuario autenticado.
 * Verifica la presencia de la sesión y que el rol pertenezca al listado permitido.
 * @param {string[]} requiredAccessLevel - Arreglo de roles habilitados
 * @returns {import("express").RequestHandler} Middleware de autorización por rol
 */
const verifyAccessLevel = (requiredAccessLevel) => {
  return (req, res, next) => {
    const { session } = req;

    if (!session || !session.userType) {
      return res.status(401).json({ message: "Sesión inválida o inexistente" });
    }

    if (!requiredAccessLevel.includes(session.userType)) {
      return res.status(403).json({ message: "No tienes permisos para acceder a esta ruta" });
    }

    next();
  };
};

module.exports = verifyAccessLevel;
